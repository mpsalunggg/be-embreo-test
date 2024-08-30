import { useQuery } from '@tanstack/react-query'
import { EventBookingType } from '@/domains/event'
import { AxiosError } from 'axios'
import { EventService } from '@/services/event'
import { BaseResponse } from '@/domains/response'

export const useGetAllEventBooked = () => {
  return useQuery<EventBookingType[], AxiosError>({
    queryKey: ['getAllEventBooked'],
    queryFn: async () => await EventService.getAllEventBooked(),
  })
}
