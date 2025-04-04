import { ComponentProps } from 'react'

import { Heading } from '@react-email/components'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '../../src/lib/utils'

const headingVariants = cva('m-0 p-0 font-semibold leading-tight text-lg', {
  variants: {
    variant: {
      warning: 'text-orange-500',
      dark: 'text-dark-400',
      primary: 'text-indigo-500',
    },
    size: {
      md: 'text-base',
      base: 'text-lg',
      lg: 'text-2xl',
    },
    type: {
      sans: 'font-sans',
      display: 'font-display',
    },
  },
  defaultVariants: {
    variant: 'warning',
    size: 'md',
    type: 'sans',
  },
})

type HeadlineProps = ComponentProps<typeof Heading> &
  VariantProps<typeof headingVariants>

const Headline = ({
  className,
  variant,
  size,
  type,
  ...rest
}: HeadlineProps) => {
  return (
    <Heading
      className={cn(headingVariants({ variant, size, type, className }))}
      {...rest}
    />
  )
}

export { Headline }
