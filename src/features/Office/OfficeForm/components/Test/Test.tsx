import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { RecievedLead } from './components/RecievedLead'

export const Test = ({ companyId }) => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Recieved Lead',
      children: <RecievedLead companyId={companyId} />,
    },
    // {
    //   key: '2',
    //   label: 'Receive Statuses',
    //   children: <ReceiveStatuses companyId={companyId} />,
    // },
  ]
  return <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
}
