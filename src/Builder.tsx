import React from 'react'
import { PublicRouter } from 'routes/PublicRoutes'
import { PrivateRouter } from 'routes/PrivateRoutes'

export const Builder = () => {

  const isAuth = true
  return    isAuth ? (
    <PrivateRouter/>
  ) : (
    <PublicRouter />
  )
}
