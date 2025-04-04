import { siteConfig } from '@/config/site'
import { Metadata } from 'next'
import { SiteHeader } from './_components/site-header'

export const metadata: Metadata = {
  title: siteConfig.getTitle(siteConfig.title),
  description:
    'Somos uma empresa de Desenvolvimento Web com foco em soluções otimizadas, rápidas e eficientes!',
}

export default function Home() {
  return (
    <>
      <SiteHeader />
    </>
  )
}
