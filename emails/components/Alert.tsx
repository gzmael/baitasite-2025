import { Column, Img, Text, Row } from '@react-email/components'

import { Headline } from './Headline'
import { env } from '@/env'

interface AlertProps {
  text: string
}

const Alert = ({ text }: AlertProps) => {
  const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  return (
    <>
      <Row>
        <Column>
          <Headline type={'display'}>Aviso Importante!</Headline>
        </Column>
      </Row>
      <Row className="rounded border border-solid border-orange-300 bg-orange-100 p-3">
        <Column className="w-6 pr-2">
          <Img className="h-6 w-6" src={`${baseUrl}/email/alert.png`} />
        </Column>
        <Column>
          <Text className="font-regular max-w[490px] text-orange-600 m-0 p-0 text-xs leading-tight">
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </Text>
        </Column>
      </Row>
    </>
  )
}

export { Alert }
