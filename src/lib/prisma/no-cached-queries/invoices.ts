import { CreateInvoiceDTO } from '@/contracts/invoices'
import { prisma } from '@/lib/prisma'

export const createClientsInvoice = async (invoices: CreateInvoiceDTO[]) => {
  await prisma.invoice.createMany({
    skipDuplicates: true,
    data: invoices.map(
      ({
        amount,
        due_date,
        reference,
        client_id,
        nossoNumero,
        digitableLine,
        barCode,
        pixCopiaECola,
        txid,
        codigoSolicitacao,
      }) => ({
        amount,
        due_date,
        reference,
        status: 'PENDING',
        client_id,
        nossoNumero,
        digitableLine,
        barCode,
        pixCopiaECola,
        txid,
        codigoSolicitacao,
      }),
    ),
  })

  const findInvoices = await prisma.invoice.findMany({
    where: {
      reference: {
        in: invoices.map((invoice) => invoice.reference),
      },
    },
  })

  await prisma.planClientOnInvoice.createMany({
    data: findInvoices.flatMap((invoice) => {
      const invoiceCreated = invoices.find(
        (invoiceCreated) => invoiceCreated.reference === invoice.reference,
      )

      if (!invoiceCreated) return []

      return invoiceCreated.planClientIds.map((planClientId) => ({
        invoiceId: invoice.id,
        plansOnClientId: planClientId.plansOnClientId,
      }))
    }),
  })

  return findInvoices
}
