import { Dispatch, SetStateAction } from 'react'
import { User } from './user'

export interface NexusConfig {
  appId: string
}

export interface NexusLoginOptions {
  closable?: boolean
  hideOverlay?: boolean
}

export interface NexusContextValue extends NexusConfig {
  nexusLogin: (options?: NexusLoginOptions) => void
  closeLoginModal: () => void
  isLoginModalOpen: boolean
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => Promise<void>
  closable: boolean
  hideOverlay: boolean
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}
