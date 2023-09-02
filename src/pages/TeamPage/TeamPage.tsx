import React from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { UsersTable } from 'features/User/UsersTable/UsersTable'

const TeamPage = () => {
  return (
    <MainLayout>
      <UsersTable />
    </MainLayout>
  )
}
export default TeamPage
