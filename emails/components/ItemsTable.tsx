import { Column, Row, Section } from '@react-email/components'

import { Item } from '@/contracts/itens'
import { convertToMoney } from '@/lib/utils'

interface ItemsTableProps {
  items: Item[]
}

export const ItemsTable = ({ items }: ItemsTableProps) => {
  const total_amount = items.reduce((acc, item) => acc + item.amount, 0)

  return (
    <Section className="w-full border-collapse px-5 pb-2 pt-0">
      <Row className="text-sm font-bold text-gray-700">
        <Column className="w-1/2 rounded-tl-md border border-r-0 border-solid border-gray-200 bg-gray-50 p-2 text-left">
          Descrição
        </Column>
        <Column className="w-[80px] border border-x-0 border-solid border-gray-200 bg-gray-50 p-2 text-center">
          Preço
        </Column>
        <Column className="border border-x-0 border-solid border-gray-200 bg-gray-50 p-2 text-center">
          Qtd
        </Column>
        <Column className="w-[80px] rounded-tr-md border border-l-0 border-solid border-gray-200 bg-gray-50 p-2 text-center">
          SubTotal
        </Column>
      </Row>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <Row key={item.description} className="text-sm text-gray-700">
            <Column
              className={`w-1/2 border-b border-l border-r-0 border-t-0 border-solid border-gray-200 p-2 text-left ${
                isLast && 'rounded-bl-md '
              }`}
            >
              {item.description}
            </Column>
            <Column className="w-[80px] border-0 border-b border-solid border-gray-200 p-2 text-center">
              {convertToMoney(item.price)}
            </Column>
            <Column className="border-0 border-b border-solid border-gray-200 p-2 text-center">
              {item.quantity}
            </Column>
            <Column
              className={`w-[80px] border-0 border-b border-r border-solid border-gray-200 p-2 text-center ${
                isLast && 'rounded-br-md '
              }`}
            >
              {convertToMoney(item.price * item.quantity)}
            </Column>
          </Row>
        )
      })}
      <Row className="font-bold text-gray-700">
        <Column colSpan={3} className=" p-2 text-left text-sm">
          Total
        </Column>
        <Column className="w-[80px] p-2 text-right text-sm">
          {convertToMoney(total_amount)}
        </Column>
      </Row>
    </Section>
  )
}
