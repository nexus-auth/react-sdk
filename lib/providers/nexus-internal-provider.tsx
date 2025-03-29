import { LoginModal } from '@/components/modals/login-modal'
import { NexusContext } from '@/context'
import { useLogout } from '@/hooks/api'
import { NexusConfig, NexusContextValue } from '@/types/nexus-config'
import { HttpStatusCode } from 'axios'
import { ReactNode, useEffect, useState } from 'react'

interface NexusInternalProviderProps {
  children: ReactNode
  config: NexusConfig
}

export default function NexusInternalProvider({ children, config }: NexusInternalProviderProps) {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const { mutateAsync: mutateLogoutAsync } = useLogout()

  const logout = async () => {
    const { status } = await mutateLogoutAsync()

    if (status === HttpStatusCode.Created) {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (config.defaultOpen) {
      setIsLoginModalOpen(true)
    }
  }, [config.defaultOpen])

  const contextValue: NexusContextValue = {
    ...nexusConfig,
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    isAuthenticated,
    setIsAuthenticated,
    logout
  }

  return (
    <NexusContext.Provider value={contextValue}>
      <LoginModal />
      {children}
    </NexusContext.Provider>
  )
}
