import { NexusContext } from '@/context'
import { DialogContent, Dialog } from '../ui/dialog'
import EmailModal from './email-modal'
import OtpModal from './otp-modal'
import { useContext, useState } from 'react'
import { cn } from '@/utils'

export function LoginModal() {
  const [email, setEmail] = useState('')
  const context = useContext(NexusContext)

  if (!context) return

  const { isLoginModalOpen, closeLoginModal, defaultOpen } = context

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      closeLoginModal()
      setEmail('')
    }
  }

  return (
    <Dialog
      defaultOpen={defaultOpen}
      open={isLoginModalOpen}
      onOpenChange={!defaultOpen ? handleOpenChange : undefined}
    >
      <DialogContent
        className={cn('sm:max-w-[375px]', defaultOpen && '[&>button]:hidden')}
        showOverlay={!defaultOpen}
      >
        {email ? <OtpModal email={email} /> : <EmailModal setEmail={setEmail} />}
      </DialogContent>
    </Dialog>
  )
}
