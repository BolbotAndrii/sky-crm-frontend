import React from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { LeadsTable } from 'features/Leads/LeadsTable'

const LeadsPage = () => {
  return (
    <MainLayout>
      <LeadsTable />
    </MainLayout>
  )
}
export default LeadsPage
