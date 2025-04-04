import { ChoiceType } from '@/contracts/choices'

export const siteConfig = {
  title: 'Grandes ideias merecem baita soluções',
  description:
    'Somos uma empresa de Desenvolvimento Web com foco em soluções otimizadas, rápidas e eficientes!',
  themeColor: '#F6F6F6',
  applicationName: 'Baita Soluções',
  canonicalUrl: 'https://baita.dev.br',
  getTitle: (title: string) => `${title} | Baita Soluções`,
  mainNav: [
    {
      title: 'Sobre',
      href: 'about',
      offset: -84,
    },
    {
      title: 'Processo',
      href: 'process',
      offset: -64,
    },
    {
      title: 'Serviço',
      href: 'services',
      offset: -64,
    },
    {
      title: 'Contato',
      href: 'contact',
      offset: -30,
    },
  ],
  links: {
    facebook: 'https://facebook.com/baitasolucoesdigitais',
    instagram: 'https://instagram.com/baita.dev/',
    whatsapp:
      'https://wa.me/+5588993200970?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre',
  },
}

export const choiceMenuList: ChoiceType[] = [
  {
    icon: 'app',
    text: 'Aplicativos',
    value: 'apps',
  },
  {
    icon: 'hosting',
    text: 'Hospedagem',
    value: 'hosting',
  },
  {
    icon: 'system',
    text: 'Sistemas',
    value: 'system',
  },
  {
    icon: 'website',
    text: 'Web Sites',
    value: 'website',
  },
  {
    icon: 'store',
    text: 'Loja Virtual',
    value: 'store',
  },
]
