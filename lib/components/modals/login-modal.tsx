import { DialogContent, Dialog, DialogTitle } from '../ui/dialog'
import EmailModal from './email-modal'
import OtpModal from './otp-modal'
import { useState } from 'react'

interface LoginModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoginModal({ open, setOpen }: LoginModalProps) {
  const [email, setEmail] = useState('')

  function onOpenChange(open: boolean) {
    setOpen(open)

    if (!open) {
      setEmail('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[375px]">
        {email ? <OtpModal email={email} /> : <EmailModal setEmail={setEmail} />}
      </DialogContent>
    </Dialog>
  )
}
