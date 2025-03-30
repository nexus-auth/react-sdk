import { useContext, useEffect } from 'react'
import { NexusContext } from '@/context'
import { useUser, useValidateSession } from './api'

export function useNexus() {
  const context = useContext(NexusContext)

  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  const { setIsAuthenticated } = context

  const { data: sessionData, isLoading } = useValidateSession()
  const { data: userData } = useUser()

  useEffect(() => {
    if (isLoading || !sessionData) return

    setIsAuthenticated(!!sessionData.data)

    if (userData?.data) {
      context.setUser(userData.data)
    }
  }, [sessionData, isLoading, setIsAuthenticated, userData?.data, context])

  const { nexusLogin, isAuthenticated, logout, user } = context

  return {
    nexusLogin,
    nexusLogout: logout,
    isAuthenticated,
    user
  }
}
