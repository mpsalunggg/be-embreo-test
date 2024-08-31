import {
  ChangeStatusReqType,
  EventBookingType,
  EventDataReqType,
  EventDataResType,
  EventListType,
  VendorListType,
} from '@/domains/event'
import { fetcher } from './instance'
import { BaseResponse } from '@/domains/response'

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
  ): Promise<BaseResponse<EventListType>> => {
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

  createScheduleBookEvent: async (
    event: EventDataReqType
  ): Promise<BaseResponse<EventDataResType>> => {
    const res = await fetcher.post('/schedule', event)
    return res.data
  },

  changeStatusEvent: async (
    event: ChangeStatusReqType
  ): Promise<BaseResponse<EventDataResType>> => {
    const res = await fetcher.put('/schedule', event)
    return res.data
  },
}
