import { Column, Hr, Section, Text } from '@react-email/components'
import dayjs from 'dayjs'

import { Alert } from './components/Alert'
import { Farewell } from './components/Farewell'
import { Footer } from './components/Footer'
import { Headline } from './components/Headline'
import { ItemsTable } from './components/ItemsTable'
import { Layout } from './components/Layout'
import { PaymentMethods } from './components/PaymentMethods'
import { SectionMiddle } from './components/SectionMiddle'
import { NewInvoice } from '@/contracts/invoices'

const dueDate = dayjs().startOf('month').add(14, 'days')
const parsedDueDate = new Intl.DateTimeFormat('pt-br', {
  dateStyle: 'long',
  timeZone: 'America/Fortaleza',
}).format(dueDate.toDate())

const emitDate = dayjs('2023-06-05').toDate()
const parsedEmitDate = new Intl.DateTimeFormat('pt-br', {
  dateStyle: 'long',
  timeZone: 'America/Fortaleza',
}).format(emitDate)

const clientDemo: NewInvoice = {
  client: {
    address1: 'Rua Iraildes Ferreira Lima, 16.',
    address2: 'Alto do Tenente, Várzea Alegre-CE',
    cnpj: '17.145.589/0001-42',
    domain: 'baitasolucoes.com.br',
    idNumber: '01',
    name: 'Baita Solucoes',
  },
  items: [
    {
      amount: 19000,
      description: 'Hospedagem + Webmail',
      price: 19000,
      quantity: 1,
    },
  ],
  alert: `Caro cliente, agora é possível pagar sua fatura via PIX com recebimento instantâneo, basta ler o QR Code que está no boleto em anexo.`,
  dueDate: parsedDueDate,
  reference: '01062023',
  emitDate: parsedEmitDate,
  nfse: null,
}

export const NewInvoiceMailTemplate = ({
  client = clientDemo.client,
  items = clientDemo.items,
  alert = clientDemo.alert,
  dueDate = clientDemo.dueDate,
  emitDate = clientDemo.emitDate,
  reference = clientDemo.reference,
  nfse = clientDemo.nfse,
}: NewInvoice) => {
  const previewText = `Invoice ${reference}`

  return (
    <Layout previewText={previewText}>
      <Section className="mx-auto w-[600px] rounded-t-lg bg-white px-[20px] pb-[8px] pt-[32px]">
        <Column>
          <Headline variant="dark" size="lg" className="font-bold">
            Fatura
          </Headline>
        </Column>
        <Column>
          <Text className="m-0 p-0 text-right text-lg font-semibold text-indigo-500">
            <span className="text-gray-700">#</span>
            {reference}
          </Text>
        </Column>
      </Section>
      <SectionMiddle>
        <Hr className="border-gray-200" />
      </SectionMiddle>
      <SectionMiddle>
        <Column className="w-1/2">
          <Headline variant="primary" type={'display'} as="h2">
            Emitido em:
          </Headline>
          <Text className="m-0 p-0 text-base text-gray-700">{emitDate}</Text>
        </Column>
        <Column className="w-1/2">
          <Headline variant="primary" type={'display'} as="h2">
            Vencimento em:
          </Headline>
          <Text className="m-0 p-0 text-base text-gray-700">{dueDate}</Text>
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column className="w-1/2">
          <Headline variant="primary" type={'display'} as="h2">
            Pagar a:
          </Headline>
          <Headline variant="dark" as="h3" className="font-bold">
            Baita Soluções Digitais
          </Headline>
          <Text className="m-0 p-0 text-sm leading-tight text-gray-700">
            CNPJ: 17.145.589/0001-42
            <br />
            Rua Iraildes Ferreira Lima, 16.
            <br />
            Alto do Tenente, Várzea Alegre-CE
          </Text>
        </Column>
        <Column className="w-1/2">
          <Headline variant="primary" type={'display'} as="h2">
            Faturado para:
          </Headline>
          <Headline variant="dark" as="h3" className="font-bold">
            {client.name}
          </Headline>
          <Text className="m-0 p-0 text-sm leading-tight text-gray-700">
            CNPJ: {client.cnpj}
            <br />
            {client.address1}.<br />
            {client.address2}
          </Text>
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Headline variant="primary" type={'display'} as="h2">
            Itens da Fatura
          </Headline>
        </Column>
      </SectionMiddle>
      <SectionMiddle className="pt-0">
        <ItemsTable items={items} />
      </SectionMiddle>
      {alert && (
        <SectionMiddle className="pt-0">
          <Alert text={alert} />
        </SectionMiddle>
      )}
      {nfse && (
        <SectionMiddle className="pt-0">
          <PaymentMethods nfse={nfse} />
        </SectionMiddle>
      )}
      <Farewell />
      <Footer />
    </Layout>
  )
}

export default NewInvoiceMailTemplate
