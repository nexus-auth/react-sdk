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

  const { setIsAuthenticated, setUser, setReady } = authContext

  const { data: sessionData, isLoading } = useValidateSession()
  const { data: userData } = useUser()

  useEffect(() => {
    if (isLoading || !sessionData) return

    const isValid = !!sessionData.data
    setIsAuthenticated(isValid)

    if (isValid && userData?.data) {
      setUser(userData.data)
    }

    setReady(true)
  }, [sessionData, isLoading, setIsAuthenticated, setUser, setReady, userData?.data])

  const { isAuthenticated, logout, user, ready } = authContext
  const { nexusLogin } = uiContext

  return {
    nexusLogin,
    nexusLogout: logout,
    isAuthenticated,
    user,
    ready
  }
}
