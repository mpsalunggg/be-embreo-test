import { FC, useRef } from 'react'
import { Modal, Form, Input, Select, DatePicker, Button, InputRef } from 'antd'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import {
  useGetAllVendor,
  useCreateEventList,
  useGetAllEventList,
} from '../hooks'
import { OPTION_EVENT_LIST, OPTION_VENDOR_LIST } from '../config'

const vendors = [
  { label: 'Nike', value: 'nike' },
  { label: 'Adidas', value: 'adidas' },
]

interface ModalAddEventProps {
  open: boolean
  handleCancel(): void
}

const ModalAddEvent: FC<ModalAddEventProps> = ({ open, handleCancel }) => {
  const { user } = useAuth()
  const { data: dataListEvent, isLoading: loadingList } = useGetAllEventList()
  const { data: dataListVendor, isLoading: loadingVendor } = useGetAllVendor()
  const { mutate, isPending } = useCreateEventList()
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    mutate({ id_author: user?.id as string, event_name: name })
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleFinish = (values: any) => {
    console.log('Form values:', values)
  }

  return (
    <Modal
      open={open}
      title={
        <h1 className="text-blue-500 text-xl font-semibold">Add New Event Book</h1>
      }
      onCancel={handleCancel}
      footer={null}
      centered
      className="min-h-2/3 overflow-scroll rounded-lg shadow-md"
    >
      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ proposed_dates: [], company: user?.company }}
      >
        <Form.Item name="company" label="My Company">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          name="event"
          label="Select Event"
          rules={[{ required: true, message: 'Please select an event' }]}
        >
          <Select
            placeholder="Event"
            dropdownRender={(menu) => (
              <>
                {loadingList ? <p>Load Data</p> : menu}
                <div className="flex mt-2">
                  <Input
                    placeholder="Add new self event"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="primary" onClick={addItem} disabled={isPending}>
                    Add
                  </Button>
                </div>
              </>
            )}
            options={OPTION_EVENT_LIST(dataListEvent || [])}
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter the location' }]}
        >
          <Input placeholder="Location" />
        </Form.Item>

        <Form.Item
          name="street_address"
          label="Street Address"
          rules={[
            { required: true, message: 'Please enter the street address' },
          ]}
        >
          <Input placeholder="Street Address" />
        </Form.Item>

        <Form.Item
          name="postal_code"
          label="Postal Code (Optional)"
          rules={[
            {
              type: 'number',
              transform: (value) => (value ? Number(value) : value),
              message: 'Please enter a valid postal code',
            },
          ]}
        >
          <Input placeholder="Postal Code" type="number" />
        </Form.Item>

        <Form.Item
          name="vendor"
          label="Select Vendor"
          rules={[{ required: true, message: 'Please select a vendor' }]}
        >
          <Select
            options={OPTION_VENDOR_LIST(dataListVendor || [])}
            placeholder="Select a vendor"
          />
        </Form.Item>

        <Form.Item
          label="Proposed Dates"
          required
          rules={[
            { required: true, message: 'Please select at least one date' },
          ]}
          className="w-full"
          style={{ width: '100%' }}
        >
          <Input.Group compact>
            <Form.Item
              name={['proposed_dates', 0]}
              rules={[{ required: true, message: 'Please select date 1' }]}
            >
              <DatePicker placeholder="Date 1" className="w-full" />
            </Form.Item>

            <Form.Item
              name={['proposed_dates', 1]}
              rules={[{ required: true, message: 'Please select date 2' }]}
            >
              <DatePicker placeholder="Date 2" className="w-full" />
            </Form.Item>

            <Form.Item
              name={['proposed_dates', 2]}
              rules={[{ required: true, message: 'Please select date 3' }]}
            >
              <DatePicker placeholder="Date 3" className="w-full" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item className="flex lg:justify-end">
          <Button type="primary" htmlType="submit" className="lg:w-24 w-full">
            Book
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalAddEvent
