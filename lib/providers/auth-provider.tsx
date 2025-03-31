import { AuthContext, AuthContextType } from '@/context/auth-context'
import { useLogout } from '@/hooks/api'
import { User } from '@/types/user'
import { HttpStatusCode } from 'axios'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | undefined>(undefined)

  const { mutateAsync: mutateLogoutAsync } = useLogout()

  const logout = async () => {
    const { status } = await mutateLogoutAsync()

    if (status === HttpStatusCode.Created) {
      setIsAuthenticated(false)
    }
  }

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
    user,
    setUser
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
