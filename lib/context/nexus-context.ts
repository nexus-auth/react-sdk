import { NexusConfig } from '@/types/nexus-config'
import { createContext } from 'react'

export const NexusContext = createContext<NexusConfig | undefined>(undefined)
