'use client'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Breadcrumb, Button, Table, TableProps, Tag } from 'antd'
import { useGetAllEventBooked } from './hooks'
import { EventBookingType } from '@/domains/event'
import { formatProposedDates } from '@/utils/date'
import { columns } from './config'
import ModalDetailEvent from './components/ModalDetailEvent'
import { useState } from 'react'

const Event = () => {
  const { data, isLoading } = useGetAllEventBooked()
  const [open, setOpen] = useState<boolean>(false)

  const showModal = () => {
    setOpen(true)
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
      <ModalDetailEvent open={open} handleCancel={handleCancel} />
    </div>
  )
}

export default Event
