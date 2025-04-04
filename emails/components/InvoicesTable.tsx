import { Column, Text } from '@react-email/components'

import { cn } from '@/lib/utils'
import { Invoice } from '@/contracts/invoices'
import { convertToMoney } from '@/lib/utils'

interface InvoicesTableProps {
  invoices: Invoice[]
}

const InvoicesTable = ({ invoices }: InvoicesTableProps) => {
  const total_amount = invoices.reduce((acc, item) => acc + item.amount, 0)

  return (
    <Column className="w-full">
      <table className="w-full border-separate" cellSpacing={0} cellPadding={0}>
        <thead>
          <th className="rounded-tl-md border border-r-0 border-solid border-gray-500 bg-gray-50 p-2 text-left text-sm font-bold">
            <Text className="m-0 p-0 text-gray-800">Descrição</Text>
          </th>
          <th className="border border-x-0 border-solid border-gray-500 bg-gray-50 p-2 text-center text-sm font-bold">
            <Text className="m-0 p-0 text-gray-800">Vencimento</Text>
          </th>
          <th className="rounded-tr-md border border-l-0 border-solid border-gray-500 bg-gray-50 p-2 text-center text-sm font-bold">
            <Text className="m-0 p-0 text-gray-800">Valor</Text>
          </th>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => {
            const isLast = index === invoices.length - 1
            return (
              <tr key={invoice.reference}>
                <td
                  className={cn(
                    'p-2 text-left',
                    isLast &&
                      'rounded-bl-md border-0 border-b border-l border-solid border-gray-500',
                  )}
                >
                  <Text className="m-0 p-0 text-sm text-gray-600">
                    {invoice.reference}
                  </Text>
                </td>
                <td
                  className={cn(
                    'border-0 border-x border-b border-solid border-gray-500 p-2 text-center',
                  )}
                >
                  <Text className="m-0 p-0 text-sm text-gray-600">
                    {invoice.dueDate}
                  </Text>
                </td>
                <td
                  className={cn(
                    'border-0 border-b border-r border-solid border-gray-500 p-2 text-center',
                    isLast && 'rounded-br-md',
                  )}
                >
                  <Text className="m-0 p-0 text-sm text-gray-600">
                    {convertToMoney(invoice.amount)}
                  </Text>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 text-center" colSpan={2}>
              <Text className="m-0 p-0 text-sm font-bold text-gray-800">
                Total
              </Text>
            </td>
            <td className="p-2 text-center">
              <Text className="m-0 p-0 text-sm font-bold text-gray-800">
                {convertToMoney(total_amount)}
              </Text>
            </td>
          </tr>
        </tfoot>
      </table>
    </Column>
  )
}

export { InvoicesTable }
