import React, { ReactNode, useState } from 'react'
import { NexusConfig } from '@/types/nexus-config'
import { NexusContext } from '@/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginModal } from '@/components/modals/login-modal'

interface NexusProviderProps {
  children: ReactNode
  config: NexusConfig
}

const queryClient = new QueryClient()

export const NexusProvider: React.FC<NexusProviderProps> = ({ children, config }) => {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <NexusContext.Provider value={{ ...nexusConfig, setIsModalOpen }}>
        <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
        {children}
      </NexusContext.Provider>
    </QueryClientProvider>
  )
}
