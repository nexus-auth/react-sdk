import { NexusLoginOptions, UIContext, UIContextType } from '@/context/ui-context'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export default function UIProvider({ children }: Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [hideOverlay, setHideOverlay] = useState(false)
  const [isClosable, setIsClosable] = useState(true)

  const closeLoginModal = () => setIsLoginModalOpen(false)

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

  const contextValue: UIContextType = {
    nexusLogin,
    closeLoginModal,
    isLoginModalOpen,
    hideOverlay,
    closable: isClosable
  }

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
}
