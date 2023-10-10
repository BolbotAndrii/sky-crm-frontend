import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { SendLead } from './components/SendLead'
import { ReceiveStatuses } from './components/ReceiveStatuses'

export const IntegrationForm = ({ companyId }) => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Send Lead',
      children: <SendLead companyId={companyId} />,
    },
    {
      key: '2',
      label: 'Receive Statuses',
      children: <ReceiveStatuses companyId={companyId} />,
    },
  ]
  return <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
}
