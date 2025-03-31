import { User } from '@/types/user'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => Promise<void>
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  ready: boolean
  setReady: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
