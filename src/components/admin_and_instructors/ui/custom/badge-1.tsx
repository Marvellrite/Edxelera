import React from 'react'
import { Badge, badgeVariants } from '../badge'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Badge_1 = ({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
  return (
    <Badge className={cn("h-8 text-base px-3", className) } variant={variant} asChild={asChild} {...props} />
  )
}

export default Badge_1