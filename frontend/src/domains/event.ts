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
  status: 'Accept' | 'Reject' | 'Pending'
  remarks_reject: string | null
  created_at: string
  eventDetails: EventDetailsType
  vendorDetails: VendorDetailsType
  authorDetails: AuthorDetailsType
}
