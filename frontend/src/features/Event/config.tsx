import { EventBookingType } from '@/domains/event'
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
