import {
  EventBookingType,
  EventListType,
  VendorListType,
} from '@/domains/event'
import { formatDates } from '@/utils/date'
import { Button, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'

export const columns = (
  showModal: (record: EventBookingType) => void
): TableProps<EventBookingType>['columns'] => {
  return [
    {
      title: 'Event Name',
      dataIndex: ['eventDetails', 'event_name'],
      key: 'eventName',
    },
    {
      title: 'Vendor Company',
      dataIndex: ['vendorDetails', 'company'],
      key: 'vendorCompany',
    },
    {
      title: 'Confirmed Date',
      key: 'confirmedDate',
      render: (_: unknown, record: EventBookingType) => (
        <span>
          {record.confirm_date ? (
            <Tag>{formatDates(record.confirm_date)}</Tag>
          ) : (
            record.proposed_dates.map((date, index) => (
              <Tag key={index}>{formatDates(date)}</Tag>
            ))
          )}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'Approve'
              ? 'green'
              : status === 'Reject'
              ? 'red'
              : 'blue'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      render: (_: unknown, record: EventBookingType) => (
        <Button type="primary" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ]
}

export const OPTION_EVENT_LIST = (data: EventListType[]) => {
  return data.map((event) => ({
    value: event._id,
    label: event.event_name,
  }))
}

export const OPTION_VENDOR_LIST = (data: VendorListType[]) => {
  return data.map((event) => ({
    value: event._id,
    label: event.company,
  }))
}

export const OPTION_CONFIRM_DATE = (dates: string[]) => {
  return dates?.map((date) => ({
    value: date,
    label: formatDates(date),
  }))
}

export const OPTION_STATUS = [
  {
    value: 'Approve',
    label: 'Approve',
  },
  {
    value: 'Reject',
    label: 'Reject',
  },
]

export const COLOR_TAG_STATUS = (status: string) => {
  if (status === 'Approve') return 'green'
  if (status === 'Reject') return 'red'
  return 'blue'
}
