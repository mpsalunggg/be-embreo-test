import { EventBookingType } from '@/domains/event'
import { Modal, Descriptions, Divider, Tag } from 'antd'
import { FC } from 'react'
import dayjs from 'dayjs'
import { formatDates } from '@/utils/date'

interface ModalEventProps {
  open: boolean
  handleCancel(): void
  data: EventBookingType | {}
}

const ModalDetailEvent: FC<ModalEventProps> = ({
  open,
  handleCancel,
  data,
}) => {
  const {
    location,
    street_address,
    postal_code,
    proposed_dates,
    confirm_date,
    status,
    remarks_reject,
    created_at,
    eventDetails,
    vendorDetails,
  } = data as EventBookingType

  return (
    <Modal
      open={open}
      title={
        <h1 className="text-blue-500 text-xl font-semibold">
          {eventDetails?.event_name}
        </h1>
      }
      onCancel={handleCancel}
      footer={null}
      centered
      className="h-2/3 overflow-scroll rounded-lg shadow-md"
    >
      <div>
        <Descriptions title="Event Details" bordered column={1}>
          <Descriptions.Item label="Event Name">
            {eventDetails?.event_name}
          </Descriptions.Item>
          <Descriptions.Item label="Location">{location}</Descriptions.Item>
          <Descriptions.Item label="Street Address">
            {street_address}
          </Descriptions.Item>
          <Descriptions.Item label="Postal Code">
            {postal_code || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Proposed Dates">
            {proposed_dates?.map((date) => (
              <Tag>{formatDates(date)}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Confirmed Date">
            {confirm_date ? formatDates(confirm_date) : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{status}</Descriptions.Item>
          {status === 'Reject' && (
            <Descriptions.Item label="Remarks">
              {remarks_reject}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Created At">
            {dayjs(created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="Vendor Details" bordered column={1}>
          <Descriptions.Item label="Username">
            {vendorDetails?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {vendorDetails?.company}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="Vendor Details" bordered column={1}>
          <Descriptions.Item label="Username">
            {vendorDetails?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {vendorDetails?.company}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  )
}

export default ModalDetailEvent
