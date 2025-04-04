import { Column, Hr, Section, Text } from '@react-email/components'

import { SectionMiddle } from './SectionMiddle'

export const Farewell = () => {
  return (
    <>
      <SectionMiddle className="pt-2">
        <Column>
          <Hr className="w-[100px]" />
        </Column>
      </SectionMiddle>
      <Section className="mx-auto w-[600px] rounded-b-lg bg-white py-5 pb-8 pt-2">
        <Column>
          <Text className="m-0 p-0 text-center text-sm text-gray-700">
            Agradecemos a sua preferência e enviamos um baita abraço,
          </Text>
          <Text className="m-0 p-0 text-center font-display text-sm text-indigo-500">
            Equipe Baita Soluções Digitais
          </Text>
        </Column>
      </Section>
    </>
  )
}
