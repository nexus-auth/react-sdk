import { useContext, useEffect } from 'react'
import { NexusContext } from '@/context'
import { useValidateSession } from './api'

export function useNexus() {
  const context = useContext(NexusContext)

  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  const { data: sessionData, isLoading } = useValidateSession()

  useEffect(() => {
    if (isLoading || !sessionData) return
    context.setIsAuthenticated(!!sessionData.data)
  }, [sessionData, isLoading, context])

  const { openLoginModal, isAuthenticated } = context

  return {
    nexusLogin: openLoginModal,
    isAuthenticated
  }
}
