import { Modal } from 'antd'
import { FC } from 'react'

interface ModalEventProps {
  open: boolean
  handleCancel(): void
}

const ModalDetailEvent: FC<ModalEventProps> = ({ open, handleCancel }) => {
  return (
    <Modal open={open} title="Title" onCancel={handleCancel} footer={null}>
      <h1>test</h1>
    </Modal>
  )
}
export default ModalDetailEvent
