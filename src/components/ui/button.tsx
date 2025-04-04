import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        success: 'bg-green-500 hover:bg-green-400 text-white',
        error: 'bg-red-500 hover:bg-red-300 text-white',
        neutral: 'bg-gray-400 hover:bg-gray-300 text-white',
        info: 'bg-indigo-900 hover:bg-indigo-800 text-indigo-50',
        transparent: 'bg-transparent text-gray-500 hover:text-gray-400',
        icon: 'bg-transparent hover:bg-transparent',
        primary:
          'bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white',
        dark: 'bg-dark-600 hover:bg-dark-800 hover:text-gray-100 text-white',
        navlink:
          'items-center justify-start bg-transparent hover:bg-gray-500 hover:text-gray-200',
      },
      size: {
        sm: 'h-8 pl-2 pr-3 gap-1 text-sm btn-sm',
        md: 'h-10 pl-3 pr-4 gap-2 text-base btn-md',
        lg: 'h-[52px] pl-5 pr-6 gap-2 text-lg btn-md',
      },
      radii: {
        none: 'rounded-none',
        xs: 'rounded',
        sm: 'rounded-md',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-full',
      },
      w: {
        full: 'w-full',
        half: 'w-3/4',
        auto: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      size: 'md',
      w: 'auto',
      radii: 'sm',
    },
    compoundVariants: [
      {
        variant: 'icon',
        size: 'sm',
        class: 'p-1.5',
      },
      {
        variant: 'icon',
        size: 'md',
        class: 'p-2',
      },
      {
        variant: 'icon',
        size: 'lg',
        class: 'p-3.5',
      },
    ],
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
