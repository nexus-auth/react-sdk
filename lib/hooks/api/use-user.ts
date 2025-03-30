import { ApiResponse } from '@/types/api-response'
import { User } from '@/types/user'
import { axios } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<User>>('/users/me')
      return data
    }
  })
}
