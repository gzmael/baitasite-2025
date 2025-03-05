import { PrismaClient } from '@prisma/client'

import { env } from '@/env'

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV !== 'production') {
    return new PrismaClient({
      datasources: { db: { url: env.DATABASE_URL } },
      log: ['query', 'warn', 'error'],
      errorFormat: 'pretty',
    })
  }
  return new PrismaClient({
    datasources: { db: { url: env.DATABASE_URL } },
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export { prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
