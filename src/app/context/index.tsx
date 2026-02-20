import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme.context'

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      { children }
    </ThemeProvider>
  )
}

export default ContextProvider