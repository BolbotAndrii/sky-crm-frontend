import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'
import { Suspense, useMemo } from 'react'
import { Routes } from 'react-router-dom'
import { privateRoute } from './helpers/PrivateRoute'
import { RoutesPath } from 'routes/types'



export const PrivateRouter = () => {
  // const auth = useAppSelector(authSelector)
  // const canReadCampany = useAppSelector(userCompanyCanRead)
  // const canReadOffice = useAppSelector(userOfficeCanRead)
  // const canReadUsers = useAppSelector(userSettingsCanRead)
  // const { users, settings, company_info } = auth?.auth_user?.permissions || {}

  // const isActiveUser = auth?.auth_user?.active

  const routes = useMemo(
    () => [
      {
        path: RoutesPath.DASHBOARD,
        title: 'Dashboard',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/DashboardPage/DashboardPage'),
        ),
        // isAccess: isActiveUser && company_info && settings && canReadCampany,
      },
  
    ],
    [window.location.pathname],
  )

  return (
    <Suspense fallback={null}>
      <Routes>{routes.map(privateRoute)}</Routes>
    </Suspense>
  )
}
