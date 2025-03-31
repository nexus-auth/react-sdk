import React, { ReactNode, useState } from 'react'
import { NexusConfig } from '@/types/nexus-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UIProvider from './ui-provider'
import { LoginModal } from '@/components/modals/login-modal'
import AuthProvider from './auth-provider'
import { NexusContext } from '@/context/nexus-context'

interface NexusProviderProps {
  children: ReactNode
  config: NexusConfig
}

export const NexusProvider: React.FC<NexusProviderProps> = ({ children, config }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
  )

  const [nexusConfig] = useState<NexusConfig>(config)

  return (
    <QueryClientProvider client={queryClient}>
      <NexusContext.Provider value={nexusConfig}>
        <AuthProvider>
          <UIProvider>
            <LoginModal />
            {children}
          </UIProvider>
        </AuthProvider>
      </NexusContext.Provider>
    </QueryClientProvider>
  )
}
