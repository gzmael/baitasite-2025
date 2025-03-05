import { ApiError } from '@/errors/apiReponseError'
import { makeBoletoClientDataList, getEmitAndDueDate } from '@/lib/utils'
import { findClientWithoutInvoice } from '@/lib/prisma/no-cached-queries/clients'
import { NextResponse } from 'next/server'
import { NewBoletoPixResponse } from '@/contracts/invoices'
import { apiInter } from '@/lib/axios'
import fs from 'fs/promises'
import https from 'https'
import path from 'path'
import { AxiosError } from 'axios'

const certificatesDirectory = path.join(process.cwd(), 'src', 'certificates')

export async function GET(request: Request) {
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

  const cert = await fs.readFile(certificatesDirectory + '/api.crt', 'utf8')
  const key = await fs.readFile(certificatesDirectory + '/api.key', 'utf8')
  const httpsAgent = new https.Agent({
    cert,
    key,
  })

  console.time('Getting clients')
  const { dueDateOriginal, month, sqlDueDate } = getEmitAndDueDate()
  const clients = await findClientWithoutInvoice(dueDateOriginal)
  console.timeEnd('Getting clients')

  if (clients.length === 0) {
    return NextResponse.json([])
  }

  const boletosToCreate = makeBoletoClientDataList(clients, month, sqlDueDate)

  console.time('Creating Inter Boleto')
  const boletosCreated = await Promise.all(
    boletosToCreate.map(async (dataBoleto) => {
      try {
        const result = await apiInter.post<NewBoletoPixResponse>(
          `/cobranca/v3/cobrancas`,
          dataBoleto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

  return NextResponse.json({ boletosCreated })
}
