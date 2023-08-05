import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'
import { Suspense, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoute } from './helpers/PrivateRoute'
import { RoutesPath } from 'routes/types'
import styled, { keyframes } from 'styled-components'

export const PrivateRouter = () => {
  const routes = useMemo(
    () => [
      {
        path: RoutesPath.DASHBOARD,
        title: 'Dashboard',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/DashboardPage/DashboardPage'),
        ),
        isAccess: true,
      },
      {
        path: RoutesPath.LEADS,
        title: 'Leads',
        exact: true,
        element: lazyWithRetry(() => import('../pages/LeadsPage/LeadsPage')),
        isAccess: true,
      },
      {
        path: RoutesPath.OFFICES,
        title: 'Offices',
        exact: true,
        element: lazyWithRetry(() => import('../pages/OfficePage/OfficePage')),
        isAccess: true,
      },
      {
        path: RoutesPath.TEAM,
        title: 'Team',
        exact: true,
        element: lazyWithRetry(() => import('../pages/TeamPage/TeamPage')),
        isAccess: true,
      },
      {
        path: RoutesPath.TRASH,
        title: 'Trash',
        exact: true,
        element: lazyWithRetry(() => import('../pages/TrashPage/TrashPage')),
        isAccess: true,
      },
    ],
    [window.location.pathname],
  )

  return (
    <Suspense fallback={null}>
      <AnimatedRouteWrapper>
        <Routes>
          {routes.map(privateRoute)}
          <Route path='*' element={<Navigate to={RoutesPath.DASHBOARD} />} />
        </Routes>
      </AnimatedRouteWrapper>
    </Suspense>
  )
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    
  }
  to {
    opacity: 1;
    
  }
`

const AnimatedRouteWrapper = styled.div`
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeInAnimation} 300ms forwards;
`
