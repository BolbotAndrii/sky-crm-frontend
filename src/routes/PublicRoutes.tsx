import React, { useMemo, Suspense } from 'react'
import { Routes, Navigate, Route } from 'react-router-dom'
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
    [window.location.hostname],
  )

  return (
    <Suspense fallback={null}>
      <Routes>
        {routes.map(publicRoute)}
        <Route path='*' element={<Navigate to={RoutesPath.LOGIN} />} />
      </Routes>
    </Suspense>
  )
}
