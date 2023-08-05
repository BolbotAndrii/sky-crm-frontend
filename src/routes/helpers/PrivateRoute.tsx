import { Navigate, Route, RouteProps } from 'react-router-dom'
import { NotAuthorized } from './NotAuthorized'

interface PrivateRouteProps {
  element: React.LazyExoticComponent<() => JSX.Element>
  isAccess: boolean
  index?: number
}

type ExtendedRouteProps = PrivateRouteProps & RouteProps

export const privateRoute: React.FC<ExtendedRouteProps> = ({
  element,
  isAccess,
  ...route
}): JSX.Element => {
  const Component = element
  const isAuth: null | string =
    JSON.parse(localStorage.getItem('auth') as string)?.token || null

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        !isAuth ? (
          <Navigate to='/login' replace={true} />
        ) : !isAccess ? (
          <NotAuthorized path='/' />
        ) : (
          <Component />
        )
      }
      {...route}
    />
  )
}
