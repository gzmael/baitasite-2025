'use server'

import { CreateInvoiceDTO } from '@/contracts/invoices'
import prisma from '@/lib/prisma'

export const createClientsInvoice = async (invoices: CreateInvoiceDTO[]) => {
  return await prisma.invoice.createMany({
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
        planClientIds,
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
        planClientOnInvoice: {
          createMany: {
            data: planClientIds,
          },
        },
      }),
    ),
  })
}
