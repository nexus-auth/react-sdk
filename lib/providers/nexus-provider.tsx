import React, { ReactNode, useState } from 'react'
import { NexusConfig } from '@/types/nexus-config'
import { NexusContext } from '@/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginModal } from '@/components/modals/login-modal'

interface NexusProviderProps {
  children: ReactNode
  config: NexusConfig
}

export interface NexusContextValue extends NexusConfig {
  openLoginModal: () => void
  closeLoginModal: () => void
  isLoginModalOpen: boolean
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const queryClient = new QueryClient()

export const NexusProvider: React.FC<NexusProviderProps> = ({ children, config }) => {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const contextValue: NexusContextValue = {
    ...nexusConfig,
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    isAuthenticated,
    setIsAuthenticated
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NexusContext.Provider value={contextValue}>
        <LoginModal />
        {children}
      </NexusContext.Provider>
    </QueryClientProvider>
  )
}
