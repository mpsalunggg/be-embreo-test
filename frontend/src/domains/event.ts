export type Status = 'Accept' | 'Reject' | 'Pending'

export interface EventDetailsType {
  _id: string
  event_name: string
  id_author: string
  __v: number
}

export interface VendorDetailsType {
  _id: string
  username: string
  password: string
  role: string
  company: string
  __v: number
}

export interface AuthorDetailsType {
  _id: string
  username: string
  password: string
  role: string
  company: string
  __v: number
}

export interface EventBookingType {
  _id: string
  location: string
  street_address: string
  postal_code: string | null
  proposed_dates: string[]
  confirm_date: string | null
  status: Status
  remarks_reject: string | null
  created_at: string
  eventDetails: EventDetailsType
  vendorDetails: VendorDetailsType
  authorDetails: AuthorDetailsType
}

export interface EventListType {
  _id: string
  event_name: string
  id_author: string
  __v: number
}

export interface VendorListType {
  _id: string
  company: string
}

export interface EventDataReqType {
  id_author: string
  id_event: string
  location: string
  street_address: string
  postal_code: string | null | number
  id_vendor: string
  proposed_dates: string[]
}

export interface EventDataResType extends EventDataReqType {
  confirm_date: Date | null
  status: Status
  remarks_reject: string | null
  _id: string
  created_at: Date
  __v: number
}

export interface ChangeStatusReqType {
  id_schedule: string
  status: Status
  confirm_date: string | null
  remarks_reject: string | null
}
