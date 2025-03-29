export interface NexusConfig {
  appId: string
  defaultOpen?: boolean
}

export interface NexusContextValue extends NexusConfig {
  openLoginModal: () => void
  closeLoginModal: () => void
  isLoginModalOpen: boolean
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => Promise<void>
}
