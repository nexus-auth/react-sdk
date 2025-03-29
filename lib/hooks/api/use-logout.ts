import { ApiResponse } from '@/types/api-response'
import { axios } from '@/utils/axios'
import { useMutation } from '@tanstack/react-query'

export function useLogout() {
  return useMutation({
    retry: false,
    mutationFn: async () => {
      return axios.post<ApiResponse>('/auth/logout')
    }
  })
}
