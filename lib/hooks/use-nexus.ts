import { useContext, useEffect } from 'react'
import { NexusContext } from '@/context'
import { useUser, useValidateSession } from './api'
import { UIContext } from '@/context/ui-context'

export function useNexus() {
  const nexusContext = useContext(NexusContext)
  const uiContext = useContext(UIContext)

  if (!nexusContext || !uiContext) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  const { setIsAuthenticated } = nexusContext

  const { data: sessionData, isLoading } = useValidateSession()
  const { data: userData } = useUser()

  useEffect(() => {
    if (isLoading || !sessionData) return

    setIsAuthenticated(!!sessionData.data)

    if (userData?.data) {
      nexusContext.setUser(userData.data)
    }
  }, [sessionData, isLoading, setIsAuthenticated, userData?.data, nexusContext])

  const { isAuthenticated, logout, user } = nexusContext
  const { nexusLogin } = uiContext

  return {
    nexusLogin,
    nexusLogout: logout,
    isAuthenticated,
    user
  }
}
