export interface ApiResponse<T = undefined> {
  message: string
  statusCode: number
  data?: T
}
