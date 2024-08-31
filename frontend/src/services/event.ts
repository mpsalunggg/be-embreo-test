import {
  EventBookingType,
  EventListType,
  VendorListType,
} from '@/domains/event'
import { fetcher } from './instance'

export const EventService = {
  getAllListEvent: async (): Promise<EventListType[]> => {
    const response = await fetcher.get('/event/')
    return response.data.data
  },

  getAllEventBooked: async (): Promise<EventBookingType[]> => {
    const response = await fetcher.get('/schedule/')
    return response.data.data
  },

  createNewEventList: async (
    id_author: string,
    event_name: string
  ): Promise<EventListType> => {
    const res = await fetcher.post('/event', {
      id_author,
      event_name,
    })
    return res.data
  },

  getAllVendor: async (): Promise<VendorListType[]> => {
    const response = await fetcher.get('/user/vendor')
    return response.data.data
  },
}
