import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { PublicRouter } from 'routes/PublicRoutes'
import { PrivateRouter } from 'routes/PrivateRoutes'
import { useAppSelector } from 'store/store'
import { SocketService } from 'services/SocketService/SocketService'

const { defaultAlgorithm, darkAlgorithm } = theme

export const Builder = () => {
  const isDarkMode = useAppSelector(state => state?.ui?.theme) === 'dark'
  const isAuth = useAppSelector(state => state?.auth?.tokens?.access?.token)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {isAuth ? (
        <SocketService>
          <PrivateRouter />
        </SocketService>
      ) : (
        <PublicRouter />
      )}
    </ConfigProvider>
  )
}
