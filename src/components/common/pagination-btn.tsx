import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface Props {
    isActive?: boolean;
    children: ReactNode
}

const PaginationBtn = ({isActive=false, children}:Props) => {
  return (
  <button className={cn(isActive && 'bg-primary text-primary-foreground', ' size-10 rounded-sm')}>{children}</button>
  )
}

export default PaginationBtn