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

  const { isLoginModalOpen, closeLoginModal, hideOverlay, closable } = context

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      closeLoginModal()
      setEmail('')
    }
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closable ? handleOpenChange : undefined}>
      <DialogContent
        className={cn('sm:max-w-[375px]', !closable && '[&>button]:hidden')}
        showOverlay={!hideOverlay}
      >
        {email ? <OtpModal email={email} /> : <EmailModal setEmail={setEmail} />}
      </DialogContent>
    </Dialog>
  )
}
