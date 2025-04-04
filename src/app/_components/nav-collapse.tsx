import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Link as LinkScroll } from 'react-scroll'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { SocialNavLinks } from './social-links'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const navVariants = cva(
  'absolute w-full h-screen top-14 right-0 lg:hidden overflow-hidden w-full bg-white shadow-xl transition-all duration-500 flex flex-col justify-center items-center invisible opacity-0 translate-x-full',
  {
    variants: {
      show: {
        true: 'visible opacity-100 translate-x-0',
      },
    },
    defaultVariants: {
      show: false,
    },
  },
)

type NavCollapseProps = {
  show?: boolean
  onClickMenu: () => void
}

const NavCollapse = ({ show = false, onClickMenu }: NavCollapseProps) => {
  const pathname = usePathname()
  const noShowNavList = ['/termos', '/privacidade']
  return (
    <div className={cn(navVariants({ show }))}>
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          {!noShowNavList.includes(pathname) ? (
            siteConfig.mainNav.map((link) => (
              <NavigationMenuItem key={link.title} className="w-full">
                <LinkScroll
                  to={link.href}
                  spy
                  smooth
                  duration={800}
                  offset={link.offset}
                  onClick={onClickMenu}
                  className={navigationMenuTriggerStyle()}
                  activeClass="nav-menu-actived"
                  href={`#${link.href}`}
                >
                  {link.title}
                </LinkScroll>
              </NavigationMenuItem>
            ))
          ) : (
            <>
              <NavigationMenuItem>
                <Link
                  href="/"
                  onClick={onClickMenu}
                  className={navigationMenuTriggerStyle()}
                >
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/termos"
                  onClick={onClickMenu}
                  className={navigationMenuTriggerStyle({
                    className: `w-max ${
                      pathname === '/termos' && 'nav-menu-md-actived'
                    }`,
                  })}
                >
                  Termos de Uso
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/privacidade"
                  onClick={onClickMenu}
                  className={navigationMenuTriggerStyle({
                    className: `w-max ${
                      pathname === '/privacidade' && 'nav-menu-md-actived'
                    }`,
                  })}
                >
                  Política de Privacidade
                </Link>
              </NavigationMenuItem>
            </>
          )}
          <NavigationMenuItem className="w-full">
            <SocialNavLinks isMobile />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export { NavCollapse }
