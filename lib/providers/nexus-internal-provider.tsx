import { LoginModal } from '@/components/modals/login-modal'
import { NexusContext } from '@/context'
import { useLogout } from '@/hooks/api'
import { NexusConfig, NexusContextValue, NexusLoginOptions } from '@/types/nexus-config'
import { HttpStatusCode } from 'axios'
import { ReactNode, useState } from 'react'

interface NexusInternalProviderProps {
  children: ReactNode
  config: NexusConfig
}

export default function NexusInternalProvider({ children, config }: NexusInternalProviderProps) {
  const [nexusConfig] = useState<NexusConfig>(config)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hideOverlay, setHideOverlay] = useState(false)
  const [isClosable, setIsClosable] = useState(true)

  const nexusLogin = (options?: NexusLoginOptions) => {
    if (options) {
      if (options.closable !== undefined) {
        setIsClosable(options.closable)
      }

      if (options.hideOverlay !== undefined) {
        setHideOverlay(options.hideOverlay)
      }
    }
    setIsLoginModalOpen(true)
  }
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const { mutateAsync: mutateLogoutAsync } = useLogout()

  const logout = async () => {
    const { status } = await mutateLogoutAsync()

    if (status === HttpStatusCode.Created) {
      setIsAuthenticated(false)
    }
  }

  const contextValue: NexusContextValue = {
    ...nexusConfig,
    nexusLogin,
    closeLoginModal,
    isLoginModalOpen,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    hideOverlay,
    closable: isClosable
  }

  return (
    <NexusContext.Provider value={contextValue}>
      <LoginModal />
      {children}
    </NexusContext.Provider>
  )
}
