import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useLoginWithEmail, LoginWithEmailData, loginWithEmailSchema } from '@/hooks/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { HttpStatusCode } from 'axios'
import { Loader2 } from 'lucide-react'

interface EmailModalProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function EmailModal({ setEmail }: EmailModalProps) {
  const { mutateAsync, isPending } = useLoginWithEmail()

  const form = useForm<LoginWithEmailData>({
    mode: 'onChange',
    resolver: zodResolver(loginWithEmailSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: LoginWithEmailData) {
    const { status } = await mutateAsync(values)

    if (status === HttpStatusCode.Created) {
      setEmail(values.email)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DialogTitle className="text-center">Sign in or sign up</DialogTitle>

      <DialogHeader>
        <DialogDescription className="text-center">
          Access your account or create a new one in seconds.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Email address" {...field} className="pr-20" />
                  </FormControl>
                  <Button
                    type="submit"
                    className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-1 text-sm rounded-l-none min-w-[80px] flex justify-center"
                    disabled={!form.formState.isValid}
                  >
                    {isPending ? <Loader2 className="animate-spin" /> : 'Submit'}
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
