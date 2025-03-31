import { User } from '@/types/user'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => Promise<void>
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
