import React from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { UserForm } from 'features/User/UserForm/UserForm'

const UserPage = () => {
  return (
    <MainLayout>
      <UserForm />
    </MainLayout>
  )
}

export default UserPage
