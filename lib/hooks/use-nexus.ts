import { useContext } from 'react'
import { NexusContext } from '@/context'

export function useNexus() {
  const context = useContext(NexusContext)

  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  return {
    nexusLogin: context.openLoginModal
  }
}
