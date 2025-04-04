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
    select: {
      id: true,
      reference: true,
      amount: true,
      client: {
        select: {
          name: true,
        },
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

export const getPendingInvoicesByDueDate = async (dueDate: string) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      due_date: dueDate,
      status: 'PENDING',
    },
    select: {
      id: true,
      nossoNumero: true,
      amount: true,
      digitableLine: true,
      due_date: true,
      created_at: true,
      txid: true,
      pixCopiaECola: true,
      codigoSolicitacao: true,
      status: true,
      nfse: true,
      client: {
        select: {
          host: true,
          document: true,
          name: true,
          type: true,
          address: true,
          idNumber: true,
          emails: {
            select: {
              email: true,
              name: true,
            },
          },
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      planClientOnInvoice: {
        select: {
          planOnClient: {
            select: {
              quantity: true,
              plan: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return invoices
}

export const getPendingInvoicesByDueDateToSendEmail = async (
  dueDate: string,
) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      due_date: dueDate,
      status: 'PENDING',
    },
    select: {
      client: {
        select: {
          name: true,
          emails: {
            select: {
              email: true,
            },
          },
          user: {
            select: {
              email: true,
            },
          },
          address: true,
          document: true,
          type: true,
          idNumber: true,
          host: true,
        },
      },
      planClientOnInvoice: {
        select: {
          planOnClient: {
            select: {
              plan: {
                select: {
                  name: true,
                  price: true,
                },
              },
              quantity: true,
            },
          },
        },
      },
      due_date: true,
      codigoSolicitacao: true,
      created_at: true,
      nfse: true,
    },
  })

  return invoices
}

export const findClientInvoiceByOurNumber = async (nossoNumero: string) => {
  const invoice = await prisma.invoice.findFirst({
    where: {
      nossoNumero,
      status: 'PENDING',
    },
    select: {
      id: true,
      nossoNumero: true,
      amount: true,
      digitableLine: true,
      due_date: true,
      created_at: true,
      txid: true,
      pixCopiaECola: true,
      codigoSolicitacao: true,
      status: true,
      nfse: true,
      client: {
        select: {
          host: true,
          document: true,
          name: true,
          type: true,
          address: true,
          idNumber: true,
          emails: {
            select: {
              email: true,
              name: true,
            },
          },
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      planClientOnInvoice: {
        select: {
          planOnClient: {
            select: {
              quantity: true,
              plan: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return invoice
}
