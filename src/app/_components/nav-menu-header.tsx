'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Link as LinkScroll } from 'react-scroll'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuMdTriggerStyle,
} from '@/components/ui/navigation-menu'
import { siteConfig } from '@/config/site'

const NavMenuHeader = () => {
  const pathname = usePathname()
  const noShowNavList = ['/termos', '/privacidade']
  const { mainNav } = siteConfig

  return (
    <NavigationMenu orientation="horizontal" className="h-full items-end">
      <NavigationMenuList className="h-full flex-row gap-6">
        {!noShowNavList.includes(pathname) ? (
          mainNav.map((link) => (
            <NavigationMenuItem key={link.title} className="flex h-full w-full">
              <LinkScroll
                to={link.href}
                spy
                smooth
                duration={800}
                offset={link.offset}
                className={navigationMenuMdTriggerStyle()}
                activeClass="nav-menu-md-actived"
                href={`#${link.href}`}
              >
                {link.title}
              </LinkScroll>
            </NavigationMenuItem>
          ))
        ) : (
          <>
            <NavigationMenuItem className="flex h-full w-full">
              <Link
                href="/termos"
                className={navigationMenuMdTriggerStyle({
                  className: `w-max ${
                    pathname === '/termos' && 'nav-menu-md-actived'
                  }`,
                })}
              >
                Termos de Uso
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex h-full w-full">
              <Link
                href="/privacidade"
                className={navigationMenuMdTriggerStyle({
                  className: `w-max ${
                    pathname === '/privacidade' && 'nav-menu-md-actived'
                  }`,
                })}
              >
                Privacidade
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { NavMenuHeader }
