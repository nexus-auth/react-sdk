import React, { ReactNode, useState } from 'react'
import { NexusConfig } from '@/types/nexus-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NexusInternalProvider from './nexus-internal-provider'

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

  return (
    <QueryClientProvider client={queryClient}>
      <NexusInternalProvider config={config}>{children}</NexusInternalProvider>
    </QueryClientProvider>
  )
}
