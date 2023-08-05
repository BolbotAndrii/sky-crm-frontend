import React from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { TrashTable } from 'features/Trash/TrashTable'

const TrashPage = () => {
  return (
    <MainLayout>
      <TrashTable />
    </MainLayout>
  )
}

export default TrashPage
