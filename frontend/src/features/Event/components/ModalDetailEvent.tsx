import { FC, useEffect, useState } from 'react'
import { Modal, Descriptions, Divider, Tag, Form, Select, Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { ChangeStatusReqType, EventBookingType } from '@/domains/event'
import { formatDates } from '@/utils/date'
import { COLOR_TAG_STATUS, OPTION_CONFIRM_DATE, OPTION_STATUS } from '../config'
import useAuth from '@/hooks/useAuth'
import { useChangeStatusEvent } from '../hooks'

interface ModalDetailEventProps {
  open: boolean
  handleCancel(): void
  data: EventBookingType | {}
}

const ModalDetailEvent: FC<ModalDetailEventProps> = ({
  open,
  handleCancel,
  data,
}) => {
  const {
    _id,
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
  const { user } = useAuth()
  const { mutate, isSuccess } = useChangeStatusEvent()
  const [statusSelect, setStatusSelect] = useState<string | null>(null)
  const handleChangeStatus = (e: string) => {
    setStatusSelect(e)
  }

  const handleFinish = (values: ChangeStatusReqType) => {
    const data = {
      ...values,
      id_schedule: _id,
    }
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) handleCancel()
  }, [isSuccess])

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
            {proposed_dates?.map((date, index) => (
              <Tag key={index}>{formatDates(date)}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Confirmed Date">
            {confirm_date ? formatDates(confirm_date) : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={COLOR_TAG_STATUS(status)}>{status?.toUpperCase()}</Tag>
          </Descriptions.Item>
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
      </div>
      {user?.role === 'Vendor' && (
        <div className="my-4">
          <p className="font-semibold text-lg">Confirm Book Event</p>
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
              name="status"
              label="Select Confirm Date"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select
                onChange={handleChangeStatus}
                options={OPTION_STATUS}
                placeholder="Select a status"
              />
            </Form.Item>
            {statusSelect === 'Approve' ? (
              <Form.Item
                name="confirm_date"
                label="Select Confirm Date"
                rules={[
                  { required: true, message: 'Please select a confirm date' },
                ]}
              >
                <Select
                  options={OPTION_CONFIRM_DATE(proposed_dates)}
                  placeholder="Select a vendor"
                />
              </Form.Item>
            ) : statusSelect === 'Reject' ? (
              <Form.Item
                name="remarks_reject"
                label="Remarks Reject"
                rules={[
                  { required: true, message: 'Please select a remarks reject' },
                ]}
              >
                <TextArea
                  placeholder="Type your reason for reject this event"
                  rows={4}
                />
              </Form.Item>
            ) : null}
            <Form.Item className="flex lg:justify-end w-full">
              <Button
                type="primary"
                htmlType="submit"
                className="lg:w-24 w-full"
                // disabled={loadingChange}
              >
                {/* {loadingChange ? 'Loading' : 'Update'} */}Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  )
}

export default ModalDetailEvent
