import { NexusContext } from '@/context'
import { useLogout } from '@/hooks/api'
import { NexusConfig, NexusContextValue } from '@/types/nexus-config'
import { User } from '@/types/user'
import { HttpStatusCode } from 'axios'
import { ReactNode, useState } from 'react'

interface NexusInternalProviderProps {
  children: ReactNode
  config: NexusConfig
}

export default function NexusInternalProvider({ children, config }: NexusInternalProviderProps) {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | undefined>(undefined)

  const { mutateAsync: mutateLogoutAsync } = useLogout()

  const logout = async () => {
    const { status } = await mutateLogoutAsync()

    if (status === HttpStatusCode.Created) {
      setIsAuthenticated(false)
    }
  }

  const contextValue: NexusContextValue = {
    ...nexusConfig,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    user,
    setUser
  }

  return <NexusContext.Provider value={contextValue}>{children}</NexusContext.Provider>
}
