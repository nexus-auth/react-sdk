import { NexusContext } from '@/context'
import { DialogContent, Dialog } from '../ui/dialog'
import EmailModal from './email-modal'
import OtpModal from './otp-modal'
import { useContext, useState } from 'react'

export function LoginModal() {
  const [email, setEmail] = useState('')
  const context = useContext(NexusContext)

  if (!context) {
    throw new Error('LoginModal must be used within a NexusProvider')
  }

  const { isLoginModalOpen, closeLoginModal } = context

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      closeLoginModal()
      setEmail('')
    }
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[375px]">
        {email ? <OtpModal email={email} /> : <EmailModal setEmail={setEmail} />}
      </DialogContent>
    </Dialog>
  )
}
