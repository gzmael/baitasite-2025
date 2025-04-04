import { Column, Img, Link, Section, Text } from '@react-email/components'

import { SocialIcon } from './SocialIcon'
import { env } from '../../src/config/env'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/baita.dev',
    iconSrc: '/email/instagram.png',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/baitasolucoes',
    iconSrc: '/email/facebook.png',
  },
  {
    name: 'Whatsapp',
    href: 'https://wa.me/+5588993200970?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre',
    iconSrc: '/email/whatsapp.png',
  },
]
export const Footer = () => {
  const year = new Date().getFullYear()
  const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  return (
    <>
      <Section className="mx-auto my-4 w-[600px] px-5">
        <Column className="text-center">
          {socialLinks.map(({ href, iconSrc, name }) => (
            <SocialIcon
              href={href}
              iconSrc={`${baseUrl}${iconSrc}`}
              name={name}
              key={name}
            />
          ))}
        </Column>
      </Section>
      <Section className="mx-auto w-[600px]">
        <Column className="py-2">
          <Text className="m-0 p-0 text-center text-xs text-gray-500">
            &#169; {year} Baita Soluções. Todos os direitos reservados.
          </Text>
          <div className="text-center text-xs text-gray-500">
            <Link
              href="https://baita.dev.br/termos"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 decoration-0"
            >
              Termos de Uso
            </Link>{' '}
            •{' '}
            <Link
              href="https://baita.dev.br/termos"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 decoration-0"
            >
              Política de Privacidade
            </Link>
          </div>
        </Column>
      </Section>
      <Section className="mx-auto w-[490px]">
        <Column className="py-3">
          <Text className="m-0 p-0 text-center text-xs text-gray-500 ">
            Baita Soluçõs Digitais LTDA •{' '}
            <Link
              href="https://baita.dev.br/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 decoration-0"
            >
              www.baita.dev.br
            </Link>{' '}
            • Rua Iraildes Ferreira Lima, nº 16 • Várzea Alegre-CE • CEP:
            63.540-000 • CNPJ: 17.184.465/0001-42
          </Text>
        </Column>
      </Section>
      <Section className="mx-auto w-[600px] px-5 py-4">
        <Column className="text-center">
          <Img
            src={`${baseUrl}/email/logo.png`}
            alt={`Baita Logo`}
            className="mx-auto w-9"
          />
        </Column>
      </Section>
    </>
  )
}
