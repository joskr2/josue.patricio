'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

interface BlurContextType {
  isBlurred: boolean
  setBlur: (blur: boolean) => void
}

const BlurContext = createContext<BlurContextType | undefined>(undefined)

export function BlurProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isBlurred, setIsBlurred] = useState(false)

  const value = useMemo(
    () => ({ isBlurred, setBlur: setIsBlurred }),
    [isBlurred],
  )

  return <BlurContext.Provider value={value}>{children}</BlurContext.Provider>
}

export function useBlur() {
  const context = useContext(BlurContext)
  if (!context) {
    throw new Error('useBlur must be used within a BlurProvider')
  }
  return context
}
