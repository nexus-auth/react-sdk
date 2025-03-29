import { NexusContextValue } from '@/types/nexus-config'
import { createContext } from 'react'

export const NexusContext = createContext<NexusContextValue | undefined>(undefined)
