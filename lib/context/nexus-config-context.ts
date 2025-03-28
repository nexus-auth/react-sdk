import { NexusConfig } from '@/types/nexus-config'
import { createContext } from 'react'

export const NexusConfigContext = createContext<NexusConfig | undefined>(undefined)
