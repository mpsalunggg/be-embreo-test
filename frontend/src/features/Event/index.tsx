'use client'
import Link from 'next/link'
import { Breadcrumb, Button, Table } from 'antd'
import { useGetAllEventBooked } from './hooks'
import { columns } from './config'
import ModalDetailEvent from './components/ModalDetailEvent'
import { useState } from 'react'
import { EventBookingType } from '@/domains/event'

const Event = () => {
  const { data, isLoading } = useGetAllEventBooked()
  const [open, setOpen] = useState<boolean>(false)
  const [detail, setDetail] = useState<EventBookingType | {}>({})

  const showModal = (record: EventBookingType) => {
    setOpen(true)
    setDetail(record)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Breadcrumb
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: <Link href="/event">Event</Link>,
            },
          ]}
        />
        <Button>+ Add New Event</Button>
      </div>
      <Table
        loading={isLoading}
        columns={columns(showModal)}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <ModalDetailEvent open={open} handleCancel={handleCancel} data={detail} />
    </div>
  )
}

export default Event
