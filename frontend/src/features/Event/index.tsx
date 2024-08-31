'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, Button, Table } from 'antd'
import { useGetAllEventBooked } from './hooks'
import { columns } from './config'
import { EventBookingType } from '@/domains/event'
import ModalDetailEvent from './components/ModalDetailEvent'
import ModalAddEvent from './components/ModalAddEvent'

const Event = () => {
  const { data, isLoading } = useGetAllEventBooked()
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [detail, setDetail] = useState<EventBookingType | {}>({})

  const showModalDetail = (record: EventBookingType) => {
    setOpenDetail(true)
    setDetail(record)
  }

  const showModalAdd = () => {
    setOpenAdd(true)
  }

  const handleCancel = () => {
    setOpenDetail(false)
    setOpenAdd(false)
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
        <Button onClick={showModalAdd}>+ Add New Event</Button>
      </div>
      <Table
        loading={isLoading}
        columns={columns(showModalDetail)}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <ModalDetailEvent
        open={openDetail}
        handleCancel={handleCancel}
        data={detail}
      />
      <ModalAddEvent open={openAdd} handleCancel={handleCancel} />
    </div>
  )
}

export default Event
