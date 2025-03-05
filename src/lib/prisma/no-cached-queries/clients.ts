'use server'

import prisma from '@/lib/prisma'

export const findClientWithoutInvoice = async (dueDate: Date) => {
  const clients = await prisma.client.findMany({
    where: {
      user: {
        status: 'ACTIVE',
      },
      invoice: {
        none: {
          due_date: dueDate,
        },
      },
    },
    select: {
      name: true,
      host: true,
      document: true,
      id: true,
      idNumber: true,
      address: {
        select: {
          neighborhood: true,
          city: true,
          number: true,
          street: true,
          uf: true,
          zipcode: true,
        },
      },
      plansOnClient: {
        where: {
          suspended_at: {
            equals: null,
          },
        },
        select: {
          id: true,
          quantity: true,
          plan: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  })

  return clients
}
