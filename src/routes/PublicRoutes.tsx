import React, { Suspense, useMemo } from 'react'
import { Routes, } from 'react-router-dom'
import { publicRoute } from './helpers/PublicRoute'
import { RoutesPath } from './types'
import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'



export const PublicRouter = () => {


  
  const routes = useMemo(
    () => [
      {
        label: 'Login',
        path: RoutesPath.LOGIN,
        element: lazyWithRetry(() => import('../pages/LoginPage/LoginPage')),
        isAccess: true,
      },
    ],
    [],
  )

  return (
    <Suspense fallback={null}>
      <Routes>
        {routes.map(publicRoute)}
      </Routes>
    </Suspense>
  )
}
