export interface BaseResponse<T = unknown> {
  data: T | null
  message?: string
}

export type BaseResponseType<T = unknown> = BaseResponse<T>
