import { promises as fs } from 'fs'
import https from 'https'
import path from 'path'
import qs from 'querystring'

import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { ApiError } from '@/errors/apiReponseError'
import { findClientWithoutInvoice } from '@/lib/prisma/no-cached-queries/clients'
import { getEmitAndDueDate, makeBoletoClientDataList } from '@/lib/utils'
import { cookies } from 'next/headers'
import { env } from '@/env'
import { apiInter } from '@/lib/axios'
import {
  CreateInvoiceDTO,
  NewBoletoPixResponse,
  SolicitacaoResponse,
} from '@/contracts/invoices'
import { createClientsInvoice } from '@/lib/prisma/no-cached-queries/invoices'
import { AxiosError } from 'axios'

const headers = {
  'Content-Type': 'application/json',
}

const certificatesDirectory = path.join(process.cwd(), 'src', 'certificates')

export async function GET(request: Request) {
  console.time('All process')

  const auth = request.headers.get('Authorization')

  if (!auth) {
    return ApiError({
      message: 'Unauthorized',
      status: 401,
    })
  }
  const token = auth.split(' ')[1]

  if (!token) {
    return ApiError({
      message: 'Invalid token',
      status: 401,
    })
  }

  console.time('Getting clients')
  const { dueDateOriginal, month, sqlDueDate } = getEmitAndDueDate()
  const clients = await findClientWithoutInvoice(dueDateOriginal)
  console.timeEnd('Getting clients')

  if (clients.length === 0) {
    console.timeEnd('All process')
    return NextResponse.json([])
  }

  const boletoClientsData = makeBoletoClientDataList(clients, month, sqlDueDate)

  console.time('Reading certificate file')
  const cert = await fs.readFile(certificatesDirectory + '/api.crt', 'utf8')
  const key = await fs.readFile(certificatesDirectory + '/api.key', 'utf8')
  const httpsAgent = new https.Agent({
    cert,
    key,
  })
  console.timeEnd('Reading certificate file')

  const cookieStore = await cookies()
  const oauthInter = null //cookieStore.get('@baitaclients:vs2:token')

  if (!oauthInter) {
    const data = {
      client_id: env.INTER_CLIENT_ID,
      client_secret: env.INTER_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope:
        'boleto-cobranca.write boleto-cobranca.read pagamento-pix.write pagamento-pix.read',
    }

    try {
      console.time('Getting Inter token')
      const result = await apiInter.post(
        '/oauth/v2/token',
        qs.stringify(data),
        {
          httpsAgent,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      console.timeEnd('Getting Inter token')

      if (result.data) {
        const { access_token } = result.data

        const expires = dayjs().add(1, 'hours').toDate()
        cookieStore.set('@baitaclients:vs2:token', access_token, {
          expires,
          path: '/api',
        })
      }
    } catch (error) {
      console.timeEnd('All process')
      console.error(error)
      return ApiError({
        message: 'Error getting Inter token',
        status: 400,
      })
    }
  }

  const Authorization = cookieStore.get('@baitaclients:vs2:token')?.value
  console.log({ Authorization })

  try {
    console.time('Creating Inter Boleto')
    const boletosCreated = await Promise.all(
      boletoClientsData.map(async (dataBoleto) => {
        try {
          const result = await apiInter.post<NewBoletoPixResponse>(
            `/cobranca/v3/cobrancas`,
            dataBoleto,
            {
              headers: {
                Authorization: `Bearer ${Authorization}`,
                'x-conta-corrent': '266946143',
              },
              httpsAgent,
            },
          )

          return {
            dataBoleto,
            data: result.data,
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log('Erro cobranca:', error.response?.data)
          }
          return {
            dataBoleto,
            data: null,
            error: true,
          }
        }
      }),
    )
    console.timeEnd('Creating Inter Boleto')

    const boletosWithCodigoSolicitacao = boletosCreated.filter(
      (result) => result.data?.codigoSolicitacao,
    )

    const results = await Promise.all(
      boletosWithCodigoSolicitacao.map(async (result) => {
        const { codigoSolicitacao } = result.data!
        const resultCobranca = await apiInter.get<SolicitacaoResponse>(
          `/cobranca/v3/cobrancas/${codigoSolicitacao}`,
          {
            headers: {
              Authorization: `Bearer ${Authorization}`,
              'x-conta-corrent': '266946143',
            },
            httpsAgent,
          },
        )

        if (resultCobranca.data) {
          return {
            dataBoleto: result.dataBoleto,
            data: resultCobranca.data,
            error: false,
          }
        }

        return {
          dataBoleto: result.dataBoleto,
          data: resultCobranca.data,
          error: true,
        }
      }),
    )

    const bolestosToCreate: CreateInvoiceDTO[] = results
      .filter((result) => !result.error)
      .map((result) => {
        const { dataBoleto, data } = result
        const {
          pagador: { cpfCnpj },
        } = dataBoleto

        const client = clients.find((client) => client.document === cpfCnpj)

        const total_amount = client!.plansOnClient.reduce(
          (acc, item) => acc + item.plan.price * item.quantity,
          0,
        )

        return {
          amount: total_amount,
          due_date: dueDateOriginal,
          reference: client!.name,
          client_id: client!.id,
          nossoNumero: data.boleto.nossoNumero,
          digitableLine: data.boleto.linhaDigitavel,
          barCode: data.boleto.codigoBarras,
          pixCopiaECola: data.pix.pixCopiaECola,
          codigoSolicitacao: data.cobranca.codigoSolicitacao,
          txid: data.pix.txid,
          planClientIds: client!.plansOnClient.map((plan) => ({
            plansOnClientId: plan.id,
          })),
        }
      })

    await createClientsInvoice(bolestosToCreate)
  } catch (error) {
    console.log(error)
    console.timeEnd('All process')
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        ...headers,
        'Set-Cookie': cookieStore.toString(),
      },
    })
  }

  console.timeEnd('All process')

  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      ...headers,
      'Set-Cookie': cookieStore.toString(),
    },
  })
}
