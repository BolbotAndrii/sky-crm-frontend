import React from 'react'
import { notification } from 'antd'
import { io } from 'socket.io-client'
import { CREATE_PUBLIC_LEAD } from './constants'
import { SmileOutlined } from '@ant-design/icons'
import { ILead } from 'types/Lead'

const host = 'http://127.0.0.1:6001'

export const socket = io(host, {
  transports: ['websocket'],
})

export const SocketService = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  const gotNewLead = (data: ILead) => {
    api.open({
      message: 'You got a new lead',
      description: (
        <>
          <div>
            <span>Offer:</span>
            <b>{data.offer}</b>
          </div>
          <div>
            <span>Country:</span>
            <b>{data.country}</b>
          </div>
        </>
      ),

      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }

  React.useEffect(() => {
    if (!socket.hasListeners(CREATE_PUBLIC_LEAD)) {
      socket.on(CREATE_PUBLIC_LEAD, gotNewLead)
    }
  }, [])

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}
