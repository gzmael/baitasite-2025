import { Column, Hr, Section, Text } from '@react-email/components'

import { Farewell } from './components/Farewell'
import { Footer } from './components/Footer'
import { Headline } from './components/Headline'
import { InvoicesTable } from './components/InvoicesTable'
import { Layout } from './components/Layout'
import { SectionMiddle } from './components/SectionMiddle'
import { Invoice } from '@/contracts/invoices'

const invoiceDemo: Invoice = {
  amount: 19000,
  dueDate: 'Abril/2023',
  reference: 'Fatura #01042023',
}

interface DelayedInvoiceMailProps {
  invoices: Invoice[]
}

export const DelayedInvoiceMail = ({
  invoices = [invoiceDemo],
}: DelayedInvoiceMailProps) => {
  const titleHeader = invoices.length > 1 ? 'Faturas' : 'Fatura'
  const previewText = `${titleHeader} em Atraso`

  return (
    <Layout previewText={previewText}>
      <Section className="mx-auto w-[600px] rounded-t-lg bg-white px-[20px] pb-[8px] pt-[32px]">
        <Column>
          <Headline
            variant="warning"
            size="lg"
            className="text-center font-bold"
          >
            {previewText}
          </Headline>
        </Column>
      </Section>
      <SectionMiddle>
        <Hr className="border-gray-200" />
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Caro cliente,
          </Text>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Gostaríamos de informar que{' '}
            {invoices.length > 1 ? 'existem faturas' : 'existe uma fatura'} de
            serviços pendentes em sua conta.
          </Text>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Pedimos a gentileza de realizar o pagamento o mais breve possível{' '}
            {invoices.length > 1
              ? ' das referidas faturas'
              : 'da referida fatura'}{' '}
            para que possamos continuar com seu serviço ativo e lhe oferecendo
            da melhor forma possível.
          </Text>
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Headline size="base" variant="primary" type="display" as="h2">
            Detalhes da{invoices.length > 1 && 's'} {titleHeader}
          </Headline>
        </Column>
      </SectionMiddle>
      <SectionMiddle className="pt-0">
        <InvoicesTable invoices={invoices} />
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Caso tenha alguma dúvida ou precise de mais informações, por favor,
            não hesite em entrar em contato conosco.
          </Text>
        </Column>
      </SectionMiddle>
      <Farewell />
      <Footer />
    </Layout>
  )
}

export default DelayedInvoiceMail
