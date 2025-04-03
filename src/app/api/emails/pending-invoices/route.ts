import { ApiError } from '@/errors/apiReponseError'
import { getLastAlert } from '@/lib/prisma/no-cached-queries/alerts'
import { getPendingInvoicesByDueDate } from '@/lib/prisma/no-cached-queries/invoices'
import { getEmitAndDueDate } from '@/lib/utils'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const headersList = await headers()
  const auth = headersList.get('Authorization')

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

  const { dueDateOriginal } = getEmitAndDueDate()

  const invoices = await getPendingInvoicesByDueDate(
    dueDateOriginal.toISOString(),
  )

  if (invoices.length === 0) {
    return NextResponse.json({ lenght: invoices.length, invoices: [] })
  }

  const { text: alert } = await getLastAlert()

  return NextResponse.json({ lenght: invoices.length, invoices, alert })
}
