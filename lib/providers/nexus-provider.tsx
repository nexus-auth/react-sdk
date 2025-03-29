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
}

const queryClient = new QueryClient()

export const NexusProvider: React.FC<NexusProviderProps> = ({ children, config }) => {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const contextValue: NexusContextValue = {
    ...nexusConfig,
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen
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
