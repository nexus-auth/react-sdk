import { NexusProvider } from '@/index'

export default function App() {
  return (
    <NexusProvider config={{ appId: '' }}>
      <h1>test</h1>
    </NexusProvider>
  )
}
