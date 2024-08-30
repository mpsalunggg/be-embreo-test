import { EventBookingType } from '@/domains/event'
import { fetcher } from './instance'

export const EventService = {
  getAllEventBooked: async (): Promise<EventBookingType[]> => {
    const response = await fetcher.get('/schedule/')
    return response.data.data
  },
}
