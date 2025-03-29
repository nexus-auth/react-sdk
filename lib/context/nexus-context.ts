import { NexusContextValue } from '@/providers'
import { createContext } from 'react'

export const NexusContext = createContext<NexusContextValue | undefined>(undefined)
