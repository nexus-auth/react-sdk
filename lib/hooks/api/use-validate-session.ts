import { ApiResponse } from '@/types/api-response'
import { axios } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'

export function useValidateSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<boolean>>('/auth/session')
      return data
    }
  })
}
