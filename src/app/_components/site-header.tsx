'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@react-email/components'
import Image from 'next/image'
import { useState } from 'react'
import { NavCollapse } from './nav-collapse'
import { SocialNavLinks } from './social-links'
import { NavMenuHeader } from './nav-menu-header'

type StatusView = undefined | 'opened' | 'closed'

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState<StatusView>()

  const handleViewMenu = () => {
    setIsOpen((prev) => {
      if (!prev) return 'opened'
      return prev === 'opened' ? 'closed' : 'opened'
    })
  }

  return (
    <header className="fixed top-0 z-50 flex h-14 w-screen justify-center bg-white px-2 shadow-md md:h-16 md:pt-2">
      <div className="mx-auto flex w-full items-center justify-between lg:max-w-screen-lg">
        <Link href="/#" className="relative z-50 block h-10 w-32 sm:mt-0">
          <Image
            src="/logo2023.svg"
            alt="Logo Baita Soluções Digitais"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
            className="mx-auto h-10"
          />
        </Link>
        <Button
          className={`group z-50 shadow-none lg:hidden ${
            isOpen === 'opened' ? 'opened' : ''
          }`}
          radii="xs"
          type="button"
          variant="icon"
          onClick={handleViewMenu}
          title="Abrir Menu"
          data-state={isOpen}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            className="stroke-indigo-500"
          >
            <path
              className="line-menu group-data-[state=opened]:line-open-odd"
              style={{ strokeDasharray: '60 207' }}
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path
              className="line-menu group-[.opened]:line-open-even"
              d="M 20,50 H 80"
              style={{ strokeDasharray: '60 60' }}
            />
            <path
              className="line-menu group-[.opened]:line-open-odd"
              style={{ strokeDasharray: '60 207' }}
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </Button>
        <NavCollapse show={isOpen === 'opened'} onClickMenu={handleViewMenu} />
        <div className="hidden h-full lg:block">
          <NavMenuHeader />
        </div>
        <SocialNavLinks />
        {/* {!session ? (
          <Button size="sm" onClick={() => signIn()} color="dark">
            Área do Cliente
          </Button>
        ) : (
          <ButtonLink size="sm" href="/dashboard" color="dark">
            Ir para Dashboard
          </ButtonLink>
        )} */}
      </div>
    </header>
  )
}
