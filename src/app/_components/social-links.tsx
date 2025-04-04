import Link from 'next/link'

import { siteConfig } from '../../config/site'
import { cn } from '../../lib/utils'
import { Icons } from '@/components/icons'

interface SocialNavLinksProps {
  isMobile?: boolean
}

const SocialNavLinks = ({ isMobile }: SocialNavLinksProps) => {
  return (
    <div
      className={cn(
        `flex h-full items-center justify-center gap-4 ${
          !isMobile && 'hidden lg:flex'
        }`,
      )}
    >
      <Link
        href={siteConfig.links.facebook}
        target="_blank"
        rel="noreferrer"
        title="Ir para o Facebook da Baita Soluções Digitais"
        className="text-gray-600 hover:text-indigo-500"
      >
        <Icons.facebook size={24} />
      </Link>
      <Link
        href={siteConfig.links.instagram}
        target="_blank"
        rel="noreferrer"
        title="Ir para o Instagram da Baita Soluções Digitais"
        className="text-gray-600 hover:text-indigo-500"
      >
        <Icons.instagram size={24} />
      </Link>
      <Link href={siteConfig.links.whatsapp} passHref legacyBehavior>
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noreferrer"
          title="Ir para o Whatsapp da Baita Soluções Digitais"
          className="text-gray-600 hover:text-indigo-500"
        >
          <Icons.whatsapp size={24} />
        </a>
      </Link>
    </div>
  )
}
export { SocialNavLinks }
