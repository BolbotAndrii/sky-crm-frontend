import React from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { TeamsTable } from 'features/Team/TeamsTable'

const TeamPage = () => {
  return (
    <MainLayout>
      <TeamsTable />
    </MainLayout>
  )
}
export default TeamPage
