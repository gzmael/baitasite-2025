import { ReactNode } from 'react'

import { Section } from '@react-email/components'

import { cn } from '../../src/lib/utils'

interface SectionMiddleProps {
  children: ReactNode
  className?: string
}

export const SectionMiddle = ({ children, className }: SectionMiddleProps) => {
  return (
    <Section className={cn('mx-auto w-[600px] bg-white px-5 py-1', className)}>
      {children}
    </Section>
  )
}
