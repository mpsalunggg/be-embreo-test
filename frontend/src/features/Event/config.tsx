import { EventBookingType } from '@/domains/event'
import { formatDates } from '@/utils/date'
import { Button, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'

export const columns = (
  showModal: () => void
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
      render: (_: string, record: EventBookingType) => (
        <span>
          {record.confirm_date ? (
            <Tag>{formatDates(record.confirm_date)}</Tag>
          ) : (
            record.proposed_dates.map((date) => <Tag>{formatDates(date)}</Tag>)
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
      render: () => (
        <Button type="primary" onClick={() => showModal()}>
          View
        </Button>
      ),
    },
  ]
}
