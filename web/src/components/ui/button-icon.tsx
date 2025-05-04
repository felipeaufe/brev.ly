import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-gray-200 text-[.75rem] font-semibold h-[2rem] w-[2rem] text-gray-500 p-2 rounded-[.25rem] [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 [&>svg]:fill-gray-600 border-1 border-gray-200 hover:border-blue-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function ButtonIcon({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, className }))} {...props} />
  )
}

export { ButtonIcon, buttonVariants }
