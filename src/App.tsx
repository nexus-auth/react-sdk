import { Button } from '@/components/ui/button'
import { useNexus } from '@/hooks'
import { NexusProvider } from '@/index'

export default function App() {
  return (
    <NexusProvider config={{ appId: '' }}>
      <AuthPage />
    </NexusProvider>
  )
}

function AuthPage() {
  const { nexusLogin, nexusLogout, isAuthenticated } = useNexus()

  return isAuthenticated ? (
    <Button onClick={() => nexusLogout()}>Logout</Button>
  ) : (
    <Button onClick={() => nexusLogin()}>Login</Button>
  )
}
