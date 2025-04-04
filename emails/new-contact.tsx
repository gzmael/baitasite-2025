import { Column, Hr, Section, Text } from '@react-email/components'

import { Footer } from './components/Footer'
import { Headline } from './components/Headline'
import { Layout } from './components/Layout'
import { SectionMiddle } from './components/SectionMiddle'
import { SendDetails } from './components/SendDetails'
import { IconChoiceTypes } from '@/contracts/choices'
import { Contact } from '@/contracts/contacts'

export const NewContactMail = ({
  email = 'email@teste.com',
  message = 'messagem',
  name = 'John Doe',
  phone = '(99) 99999-9994',
  subject = 'app',
}: Contact) => {
  const previewText = `Novo Contato do site`

  const subjects: Record<IconChoiceTypes, string> = {
    system: 'Sistemas',
    app: 'Aplicativo',
    hosting: 'Hospedagem',
    store: 'Loja Virtual',
    website: 'Web site',
  }

  return (
    <Layout previewText={previewText}>
      <Section className="mx-auto w-[600px] rounded-t-lg bg-white px-[20px] pb-[8px] pt-[32px]">
        <Column>
          <Headline variant="dark" size="lg" className="text-center font-bold">
            Novo Contato do site
          </Headline>
        </Column>
      </Section>
      <SectionMiddle>
        <Hr className="border-gray-200" />
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Text>
            <strong>De:</strong> {name} <br />
            <strong>E-mail:</strong> {email} <br />
            <strong>Telefone:</strong> {phone} <br />
            <strong>Assunto:</strong> {subjects[subject]} <br />
          </Text>
          <Text>
            <strong>Messagem:</strong> <br />
            {message}
          </Text>
        </Column>
      </SectionMiddle>
      <SendDetails />
      <Footer />
    </Layout>
  )
}

export default NewContactMail
