import { useContext, useEffect } from 'react'
import { NexusContext } from '@/context'
import { useValidateSession } from './api'

export function useNexus() {
  const context = useContext(NexusContext)

  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  const { setIsAuthenticated } = context

  const { data: sessionData, isLoading } = useValidateSession()

  useEffect(() => {
    if (isLoading || !sessionData) return
    setIsAuthenticated(!!sessionData.data)
  }, [sessionData, isLoading, setIsAuthenticated])

  const { openLoginModal, isAuthenticated, logout } = context

  return {
    nexusLogin: openLoginModal,
    nexusLogout: logout,
    isAuthenticated
  }
}
