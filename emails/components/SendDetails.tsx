import { Column, Hr, Section, Text } from '@react-email/components'

import { Headline } from './Headline'
import { SectionMiddle } from './SectionMiddle'

export const SendDetails = () => {
  const date = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(new Date())
  return (
    <>
      <SectionMiddle className="pt-2">
        <Column>
          <Hr className="w-[100px]" />
        </Column>
      </SectionMiddle>
      <Section className="mx-auto w-[600px] rounded-b-lg bg-white py-5 pb-8 pt-2">
        <Column>
          <Headline
            type="display"
            variant="primary"
            className="text-center text-lg"
          >
            Horário de Envio
          </Headline>
          <Text className="m-0 p-0 text-center text-sm text-gray-700">
            {date}
          </Text>
        </Column>
      </Section>
    </>
  )
}
