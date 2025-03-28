import { NexusConfigContext } from '@/context'
import { NexusConfig } from '@/types/nexus-config'
import { useContext } from 'react'

export const useNexus = (): NexusConfig => {
  const context = useContext(NexusConfigContext)
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }
  return context
}
