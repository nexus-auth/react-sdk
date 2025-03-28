import { createContext } from 'react'

export interface NexusConfig {
  appId: string
}

export const NexusContext = createContext<NexusConfig | undefined>(undefined)
