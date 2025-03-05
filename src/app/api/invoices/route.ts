import { promises as fs } from 'fs'
import https from 'https'
import path from 'path'

import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { ApiError } from '@/errors/apiReponseError'
import { findClientWithoutInvoice } from '@/lib/prisma/no-cached-queries/clients'
import { getEmitAndDueDate } from '@/lib/utils'

import { apiInter } from '@/lib/axios'
import { CreateInvoiceDTO, GetBoletoResponse } from '@/contracts/invoices'
import { createClientsInvoice } from '@/lib/prisma/no-cached-queries/invoices'

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
  const { dueDateOriginal } = getEmitAndDueDate()
  const clients = await findClientWithoutInvoice(dueDateOriginal)
  console.timeEnd('Getting clients')

  if (clients.length === 0) {
    console.timeEnd('All process')
    return NextResponse.json([])
  }

  console.time('Reading certificate file')
  const cert = await fs.readFile(certificatesDirectory + '/api.crt', 'utf8')
  const key = await fs.readFile(certificatesDirectory + '/api.key', 'utf8')
  const httpsAgent = new https.Agent({
    cert,
    key,
  })
  console.timeEnd('Reading certificate file')

  const initalDate = dayjs().startOf('month').format('YYYY-MM-DD')
  const finalDate = dayjs().endOf('month').format('YYYY-MM-DD')

  const result = await apiInter.get<GetBoletoResponse>(
    `/cobranca/v3/cobrancas?dataInicial=${initalDate}&dataFinal=${finalDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    },
  )

  const { cobrancas = [] } = result.data

  const clientsWithCobranca = cobrancas
    .map((cobranca) => {
      const client = clients.find(
        (client) => client.document === cobranca.pagador.cpfCnpj,
      )

      if (!client) {
        return []
      }

      return {
        client,
        cobranca,
      }
    })
    .flatMap((result) => result)

  const invoicesToCreate: CreateInvoiceDTO[] = clientsWithCobranca.map(
    ({ cobranca, client }) => {
      const total_amount = client.plansOnClient.reduce(
        (acc, item) => acc + item.plan.price * item.quantity,
        0,
      )

      return {
        amount: total_amount,
        due_date: dueDateOriginal,
        reference: client.name,
        client_id: client.id,
        nossoNumero: cobranca.boleto.nossoNumero,
        digitableLine: cobranca.boleto.linhaDigitavel,
        barCode: cobranca.boleto.codigoBarras,
        pixCopiaECola: cobranca.pix.pixCopiaECola,
        codigoSolicitacao: cobranca.cobranca.codigoSolicitacao,
        txid: cobranca.pix.txid,
        planClientIds: client.plansOnClient.map((plan) => ({
          plansOnClientId: plan.id,
        })),
      }
    },
  )

  await createClientsInvoice(invoicesToCreate)

  console.timeEnd('All process')

  return new Response(JSON.stringify(clients), {
    status: 200,
  })
}
