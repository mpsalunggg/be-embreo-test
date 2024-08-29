export interface ResponseType {
  message: string
  data: any
}

export const ApiResponse = (
  message: string,
  data: any = null
): ResponseType => {
  return {
    message,
    data,
  }
}
