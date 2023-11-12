import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { MainForm } from './components/MainForm/MainForm'
import { IntegrationForm } from './components/IntegrationForm/IntegrationForm'
import { LeadSetupForm } from './components/LeadsSetupForm/LeadSetupForm'
import { Test } from './components/Test/Test'
import { useParams } from 'react-router-dom'

function extractKeys(data, keysToReplace, result = {}) {
  if (Array.isArray(data)) {
    data.forEach(item => extractKeys(item, keysToReplace, result))
  } else if (typeof data === 'object' && data !== null) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] !== 'object' && data[key]) {
          console.log(key, data[key])
          result[key] = data[key]
        } else {
          extractKeys(data[key], keysToReplace, result)
        }
      }
    }
  }

  const responceKeys = {}

  for (let key in keysToReplace) {
    responceKeys[key] = result[keysToReplace[key]]
  }

  return responceKeys
}

// Пример использования:
const keysToReplace = {
  autologin: 'redirectUrl',
  ext_status: 'status',
  lead_id: 'email',
}
const backendData = {
  status: true,
  code: 200,
  message: 'The lead has been successfully added',
  data: {
    id: '65500b822710815f5e5a9136',
    uid: 'HCG20231111-8',
    first_name: 'Maksym',
    last_name: 'Kovalenko',
    phone: '+242333333434242444',
    email: 'fsddвeвddвddddвfsf@sdsd.com',
    password: '$2b$10$1yVd75mVxEcRQRcsk5y.7OlitXYq7VsYyOFWrecohd331fWqe/xEa',
    source: 'test.com',
    ip: '0.0.0.0',
    funnel_name: 'GAZPROM',
    assigned_to: null,
    status_id: null,
    created_by: '6548d44af619e4a27b3b8665',
    status: null,
    brand: null,
    client_type: 1,
    company_id: '6547c2c0df331a8845ba6fc9',
    comments: null,
    logs: null,
    payments: {
      deposits: null,
      withdrawals: null,
      accounts: null,
      cfd_orders: null,
      documents: null,
      redirectUrl:
        'ProCapitalTrade.com?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzZGTQsmXQsmRk0LJkZGRk0LJmc2ZAc2RzZC5jb20iLCJwd2QiOiIkMmIkMTAkMXlWZDc1bVZ4RWNSUVJjc2s1eS43T2xpdFhZcTdWc1l5T0ZXcmVjb2hkMzMxZldqZS94RWEiLCJpYXQiOjE2OTk3NDQ2NDJ9.guWBeEeZD4pkcxipiqusZ6pPuy4tbnxsdR68Dlxb1ZA',
    },
  },
}

const updatedData = extractKeys(backendData, keysToReplace)

console.log(updatedData, 'updatedData')

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
