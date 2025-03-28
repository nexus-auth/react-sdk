import { NexusConfig } from '@/types/nexus-config'
import { createContext } from 'react'

export const NexusContext = createContext<
  | (NexusConfig & {
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    })
  | undefined
>(undefined)
