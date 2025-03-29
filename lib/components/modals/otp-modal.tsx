import { SendOtpCodeData, sendOtpCodeSchema, useLoginWithEmail, useSendOtpCode } from '@/hooks/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { HttpStatusCode } from 'axios'
import { cn } from '@/utils'

interface OtpModalProps {
  email: string
}

export default function OtpModal({ email }: OtpModalProps) {
  const [codeResended, setCodeResended] = useState(false)
  const [isError, setIsError] = useState(false)

  const { mutateAsync: mutateResendCodeAsync } = useLoginWithEmail()
  const { mutateAsync } = useSendOtpCode()

  const form = useForm<SendOtpCodeData>({
    resolver: zodResolver(sendOtpCodeSchema),
    defaultValues: {
      email,
      otpCode: ''
    }
  })

  async function onSubmit() {
    const { email, otpCode } = form.getValues()

    if (otpCode.length !== 6) return

    const { status } = await mutateAsync({ email, otpCode })

    if (status !== HttpStatusCode.Created) {
      handleInvalidCode()
    }
  }

  function handleInvalidCode() {
    setIsError(true)
    setTimeout(() => setIsError(false), 3000)
  }

  async function resendCode() {
    await mutateResendCodeAsync({ email })
    setCodeResended(true)
    setTimeout(() => setCodeResended(false), 30000)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DialogTitle className="text-center">Enter confirmation code</DialogTitle>

      <DialogHeader>
        <DialogDescription className="text-center">
          Please check <span className="font-semibold">{email}</span> for an email from Nexus Auth
          and enter your code below.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4 text-left">
          <FormField
            control={form.control}
            name="otpCode"
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl onChange={onSubmit}>
                  <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                    <InputOTPGroup>
                      {Array(6)
                        .fill(0)
                        .map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            className={cn(
                              isError && 'ring-0 border-2 border-red-500',
                              index < 5 && isError && 'border-r-0'
                            )}
                            index={index}
                          />
                        ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {renderModalFooter()}
        </form>
      </Form>
    </div>
  )

  function renderModalFooter() {
    if (isError) {
      return (
        <DialogDescription className="text-center">
          <span className="text-red-600">Invalid or expired validation code.</span>
        </DialogDescription>
      )
    }

    return (
      <DialogDescription className="mt-4 text-center flex justify-center items-center gap-2">
        <span>Didn't get an email?</span>
        {codeResended ? (
          <span className="flex items-center gap-x-1 bg-black text-white rounded p-1 px-2">
            <Check size={12} /> <span>Code sent</span>
          </span>
        ) : (
          <span
            className="font-semibold underline cursor-pointer hover:text-black"
            onClick={resendCode}
          >
            Resend code
          </span>
        )}
      </DialogDescription>
    )
  }
}
