import { ApiResponse } from '@/types/api-response'
import { axios } from '@/utils/axios'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const loginWithEmailSchema = z.object({
  email: z.string().email()
})

export type LoginWithEmailData = z.infer<typeof loginWithEmailSchema>

export function useLoginWithEmail() {
  return useMutation({
    mutationFn: async (payload: LoginWithEmailData) => {
      return axios.post<ApiResponse>('/auth/login', payload)
    }
  })
}
