import { Column, Hr, Link, Section, Text } from '@react-email/components'
import dayjs from 'dayjs'

import { Farewell } from './components/Farewell'
import { Footer } from './components/Footer'
import { Headline } from './components/Headline'
import { Layout } from './components/Layout'
import { SectionMiddle } from './components/SectionMiddle'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

const contentDemo = {
  link: 'https://baitasolucoes.com.br/link',
  domain: 'baitasolucoes.com.br',
  expiringDate: '2023-11-15T03:00:00.000Z',
}

type RenewDomainEmailProps = typeof contentDemo

export const RenewDomainEmail = ({
  domain = contentDemo.domain,
  expiringDate = contentDemo.expiringDate,
  link = contentDemo.link,
}: RenewDomainEmailProps) => {
  const previewText = `Renovação de Domínio`
  const niceTime = dayjs(expiringDate).format('D [de] MMMM [de] YYYY')

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
            Gostaríamos de informar que no dia {niceTime},{' '}
            <strong>
              termina o período de validade do registro do seu domínio &ldquo;
              {domain}&rdquo;
            </strong>
            .
          </Text>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Para renovar basta acessar o site do Registro.BR no endereço{' '}
            <Link href={link} target="_blank">
              {link}
            </Link>{' '}
            ou clicar no botão abaixo e escolher o novo período de
            funcionamento.
          </Text>
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column align="center" valign="middle">
          <Link
            href={link}
            className="inline-flex w-auto cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-500 p-4 text-base font-medium leading-none text-white transition-all hover:text-white"
          >
            Renovar Domínio
          </Link>
        </Column>
      </SectionMiddle>
      <SectionMiddle className="pt-0">
        <Column>
          <Text className="my-2 p-0 text-base leading-tight text-gray-700">
            Para evitar a suspensão do funcionamento do domínio (congelamento) é
            necessário que efetue o pagamento até o dia do vencimento.
          </Text>
        </Column>
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

export default RenewDomainEmail
