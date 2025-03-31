import { createContext } from 'react'

export interface NexusLoginOptions {
  closable?: boolean
  hideOverlay?: boolean
}

export interface UIContextType {
  closable: boolean
  hideOverlay: boolean
  nexusLogin: (options?: NexusLoginOptions) => void
  closeLoginModal: () => void
  isLoginModalOpen: boolean
}

export const UIContext = createContext<UIContextType | undefined>(undefined)
