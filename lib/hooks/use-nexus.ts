import { useContext, useEffect } from 'react'
import { useUser, useValidateSession } from './api'
import { UIContext } from '@/context/ui-context'
import { AuthContext } from '@/context/auth-context'

export function useNexus() {
  const uiContext = useContext(UIContext)
  const authContext = useContext(AuthContext)

  if (!uiContext || !authContext) {
    throw new Error('useNexus must be used within a NexusProvider')
  }

  const { setIsAuthenticated } = authContext

  const { data: sessionData, isLoading } = useValidateSession()
  const { data: userData } = useUser()

  useEffect(() => {
    if (isLoading || !sessionData) return

    setIsAuthenticated(!!sessionData.data)

    if (userData?.data) {
      authContext.setUser(userData.data)
    }
  }, [sessionData, isLoading, setIsAuthenticated, userData?.data, authContext])

  const { isAuthenticated, logout, user } = authContext
  const { nexusLogin } = uiContext

  return {
    nexusLogin,
    nexusLogout: logout,
    isAuthenticated,
    user
  }
}
