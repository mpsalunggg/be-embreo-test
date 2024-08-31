import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  EventBookingType,
  EventListType,
  VendorListType,
} from '@/domains/event'
import { AxiosError } from 'axios'
import { EventService } from '@/services/event'
import { message } from 'antd'

export const useGetAllEventList = () => {
  return useQuery<EventListType[], AxiosError>({
    queryKey: ['getAllEventList'],
    queryFn: async () => await EventService.getAllListEvent(),
  })
}

export const useGetAllEventBooked = () => {
  return useQuery<EventBookingType[], AxiosError>({
    queryKey: ['getAllEventBooked'],
    queryFn: async () => await EventService.getAllEventBooked(),
  })
}

export const useCreateEventList = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (values: { id_author: string; event_name: string }) =>
      await EventService.createNewEventList(
        values.id_author,
        values.event_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllEventList'] })
      message.success('Success add new self event!')
    },
    onError: (err: AxiosError) => {
      message.error(err?.message || 'Something went wrong!')
    },
  })
}

export const useGetAllVendor = () => {
  return useQuery<VendorListType[], AxiosError>({
    queryKey: ['getAllVendor'],
    queryFn: async () => await EventService.getAllVendor(),
  })
}
