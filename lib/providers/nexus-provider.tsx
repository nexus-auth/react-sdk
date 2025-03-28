import React, { ReactNode, useState } from 'react'
import { NexusConfig } from '@/types/nexus-config'
import { NexusConfigContext } from '@/context'

interface NexusProviderProps {
  children: ReactNode
  config?: NexusConfig
}

export const NexusProvider: React.FC<NexusProviderProps> = ({ children, config }) => {
  const [nexusConfig] = useState<NexusConfig | undefined>(config)

  return <NexusConfigContext.Provider value={nexusConfig}>{children}</NexusConfigContext.Provider>
}
