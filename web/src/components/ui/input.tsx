import type * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <div>
      <input
        type={type}
        data-slot="input"
        className={cn(
          'placeholder:text-gray-400 text-gray-600 dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-blue-base focus-visible:text-blue-base focus-visible:placeholder:text-blue-base',
          'aria-invalid:danger/20 dark:aria-invalid:danger/40 aria-invalid:border-danger aria-invalid:text-danger aria-invalid:placeholder:text-danger',
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
