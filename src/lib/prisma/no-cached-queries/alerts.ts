import { prisma } from '@/lib/prisma'

export const getLastAlert = async () => {
  const alerts = await prisma.alert.findMany({
    where: {
      type: 'NEW_INVOICE',
    },
    orderBy: {
      created_at: 'desc',
    },
    take: 1,
    select: {
      text: true,
    },
  })
  return alerts[0]
}
