import { ReactNode } from 'react'

import {
  Body,
  Container,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components'

import { Header } from './Header'
import { HeadMail } from './HeadMail'
import { theme } from '@/theme'

interface LayoutProps {
  previewText: string
  children: ReactNode
}

export const Layout = ({ previewText, children }: LayoutProps) => {
  return (
    <Html lang="pt-br">
      <HeadMail />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            colors: theme.colors,
            fontFamily: {
              sans: ['Poppins', 'sans-serif'],
              display: ['Alata', 'sans-serif'],
            },
          },
        }}
      >
        <Body className="m-0 w-full bg-dark-900 py-5 font-sans antialiased">
          <Container>
            <Header />
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
