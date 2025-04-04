import { env } from '@/env'
import { ApiError } from '@/errors/apiReponseError'
import { getLastAlert } from '@/lib/prisma/no-cached-queries/alerts'
import {
  findClientInvoiceByOurNumber,
  getPendingInvoicesByDueDateToSendEmail,
} from '@/lib/prisma/no-cached-queries/invoices'
import { getEmitAndDueDate, getMonthYearFromDate } from '@/lib/utils'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { promises as fs } from 'fs'
import https from 'https'
import path from 'path'
import { z } from 'zod'
import { apiInter } from '@/lib/axios'
import { AttachmentMail, NewInvoiceMail } from '@/contracts/emails'
import resend from '@/lib/resend'
import { NewInvoiceMailTemplate } from '../../../../../emails/new-invoice'

const certificatesDirectory = path.join(process.cwd(), 'src', 'certificates')

export async function GET() {
  const headersList = await headers()
  const auth = headersList.get('Authorization')

  if (!auth) {
    return ApiError({
      message: 'Unauthorized',
      status: 401,
    })
  }

  const token = auth.split(' ')[1]

  if (!token || token !== env.TOKEN_API) {
    return ApiError({
      message: 'Invalid token',
      status: 401,
    })
  }

  const { dueDateOriginal } = getEmitAndDueDate()

  const invoices = await getPendingInvoicesByDueDateToSendEmail(
    dueDateOriginal.toISOString(),
  )

  if (invoices.length === 0) {
    return NextResponse.json({ lenght: invoices.length, invoices: [] })
  }

  const { text: alert } = await getLastAlert()

  return NextResponse.json({ lenght: invoices.length, invoices, alert })
}

export async function POST(req: Request) {
  const bodySchema = z.object({
    alert: z.string().optional(),
    ourNumber: z.string({ required_error: 'Invalid ourNumber.' }),
  })

  const headersList = await headers()
  const auth = headersList.get('Authorization')
  const body = await req.json()

  const { alert, ourNumber } = bodySchema.parse(body)

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

  const invoice = await findClientInvoiceByOurNumber(ourNumber)

  if (!invoice) {
    return ApiError({
      message: 'Invoice not found',
      status: 404,
    })
  }

  const {
    client,
    planClientOnInvoice,
    due_date,
    codigoSolicitacao,
    created_at: emit_date,
    nfse,
  } = invoice

  console.time('Reading certificate file')
  const cert = await fs.readFile(certificatesDirectory + '/api.crt', 'utf8')
  const key = await fs.readFile(certificatesDirectory + '/api.key', 'utf8')
  const httpsAgent = new https.Agent({
    cert,
    key,
  })
  console.timeEnd('Reading certificate file')

  const boletosPDF: AttachmentMail[] = []

  const result = await apiInter.get(
    `/cobranca/v3/cobrancas/${codigoSolicitacao}/pdf`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    },
  )

  if (result.data) {
    const { pdf } = result.data
    boletosPDF.push({
      content: Buffer.from(pdf, 'base64'),
      filename: 'boleto.pdf',
    })
  }

  const { month, year } = getMonthYearFromDate(due_date)

  const subject = `[Baita Soluções] Fatura ${month} de ${year} - ${client.host}`
  const emails = client.emails.map((clientEmail) => clientEmail.email)
  const userEmail = client.user.email
  console.log({ emails, userEmail })
  const { address, document, type, idNumber } = client
  const { dueDate, emitDate, monthYear } = getEmitAndDueDate(emit_date)
  const reference = `${idNumber.toString().padStart(2, '0')}${monthYear}`

  const bodyEmailData: NewInvoiceMail = {
    client: {
      idNumber: client.idNumber.toString().padStart(2, '0'),
      address1: `${address?.street}, ${address?.number}`,
      address2: `${address?.neighborhood}, ${address?.city}-${address?.uf}`,
      cnpj: type === 'JURIDICA' ? cnpj.format(document) : cpf.format(document),
      name: client.name,
      domain: client.host,
    },
    items: planClientOnInvoice.map(({ planOnClient }) => ({
      price: planOnClient.plan.price,
      quantity: planOnClient.quantity,
      amount: planOnClient.plan.price * planOnClient.quantity,
      description: planOnClient.plan.name,
    })),
    dueDate,
    emitDate,
    reference,
    alert,
    nfse,
  }

  // const originalTo =
  //   userEmail && emails.length === 0
  //     ? [userEmail, 'jezmaelbasilio@gmail.com']
  //     : [...emails, 'jezmaelbasilio@gmail.com']
  const originalTo = ['jezmaelbasilio@gmail.com']

  console.log(originalTo)
  console.timeEnd('Formating data invoice')

  console.time('Sending e-mail')
  await resend.emails.send({
    from: 'pagamentos@baita.dev.br',
    to: originalTo,
    subject,
    react: NewInvoiceMailTemplate(bodyEmailData),
    attachments: boletosPDF,
  })
  console.timeEnd('Sending e-mail')

  console.timeEnd('All process')
  return new Response(JSON.stringify({ data: 'Email sent successfully' }), {
    status: 200,
  })
}
