import { ApiResponse } from '@/types/api-response'
import { axios } from '@/utils/axios'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const sendOtpCodeSchema = z.object({
  email: z.string().email(),
  otpCode: z.string()
})

export type SendOtpCodeData = z.infer<typeof sendOtpCodeSchema>

export function useSendOtpCode() {
  return useMutation({
    mutationFn: async (payload: SendOtpCodeData) => {
      return axios.post<ApiResponse>('/auth/login/verify-otp', payload)
    }
  })
}
