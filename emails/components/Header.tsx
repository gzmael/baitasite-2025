import { Column, Img, Section } from '@react-email/components'

import { env } from '../../src/config/env'

interface HeaderProps {
  loose?: boolean
}

export const Header = ({ loose }: HeaderProps) => {
  const baseUrl = env.NEXT_PUBLIC_VERCEL_URL

  return (
    <Section className={`0 mt-12 ${loose ? 'mb-10' : 'mb-6'}`}>
      <Column>
        <Img
          src={`${baseUrl}/logoEmail.png`}
          className="mx-auto h-auto w-[300px] px-6"
        />
      </Column>
    </Section>
  )
}
