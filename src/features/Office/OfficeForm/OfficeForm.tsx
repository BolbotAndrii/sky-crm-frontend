import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { MainForm } from './components/MainForm/MainForm'
import { IntegrationForm } from './components/IntegrationForm/IntegrationForm'
import { LeadSetupForm } from './components/LeadsSetupForm/LeadSetupForm'
import { Test } from './components/Test/Test'
import { useParams } from 'react-router-dom'

export const OfficeForm = () => {
  const { id: companyId } = useParams()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Main Info',
      children: <MainForm companyId={companyId} />,
    },
    {
      key: '2',
      label: 'Integration',
      children: <IntegrationForm companyId={companyId} />,
      disabled: companyId === 'new',
    },
    {
      key: '3',
      label: 'Presets',
      children: <LeadSetupForm companyId={companyId} />,
      disabled: companyId === 'new',
    },
    {
      key: '4',
      label: 'Test API',
      children: <Test companyId={companyId} />,
      disabled: companyId === 'new',
    },
  ]
  return <Tabs defaultActiveKey='1' items={items} />
}
