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
  const { nexusLogin, isAuthenticated } = useNexus()

  return isAuthenticated ? (
    <h1>Authtenticated</h1>
  ) : (
    <Button onClick={() => nexusLogin()}>Login</Button>
  )
}
