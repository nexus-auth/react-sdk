import { Dispatch, SetStateAction } from 'react'
import { User } from './user'

export interface NexusConfig {
  appId: string
}

export interface NexusContextValue extends NexusConfig {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => Promise<void>
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}
