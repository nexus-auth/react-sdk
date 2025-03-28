import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  Dialog,
  DialogTitle
} from './ui/dialog'
import { Input } from './ui/input'
import { LoginWithEmailData, loginWithEmailSchema, useLoginWithEmail } from '@/hooks/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

interface LoginModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoginModal({ open, setOpen }: LoginModalProps) {
  const { mutateAsync, isPending } = useLoginWithEmail()

  const form = useForm<LoginWithEmailData>({
    resolver: zodResolver(loginWithEmailSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: LoginWithEmailData) {
    await mutateAsync(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle />

        <DialogHeader>
          <DialogDescription className="text-center">Log in or sign up</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="w-full" isLoading={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
