import { Button } from '@/components/ui/button'
import { useNexus } from '@/hooks'
import { NexusProvider } from '@/index'

export default function App() {
  return (
    <NexusProvider config={{ appId: '' }}>
      <AuthButton />
    </NexusProvider>
  )
}

function AuthButton() {
  const { nexusLogin } = useNexus()

  return <Button onClick={() => nexusLogin()}>Login</Button>
}
