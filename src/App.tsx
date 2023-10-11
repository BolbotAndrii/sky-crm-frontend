import React, { Suspense } from 'react'
import { Spin } from 'antd'
import { store, persistor } from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import CookiesDetector from 'services/CookiesDetector/CookiesDetector'
import { Builder } from 'Builder'
import CacheBuster from 'services/CasheBuster/CasheBuster'
import { PersistGate } from 'redux-persist/integration/react'
import './styles/index.scss'
import moment from 'moment-timezone'
import 'moment/locale/ru'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

moment.locale('ua')

export const App = () => {
  return (
    <Suspense
      fallback={
        <Spin style={{ position: 'absolute', left: '30%', top: '45%' }} />
      }
    >
      <CookiesDetector>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <CacheBuster>
                {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                  if (loading) return <Spin />
                  if (!loading && !isLatestVersion) refreshCacheAndReload()

                  return <Builder />
                }}
              </CacheBuster>
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </CookiesDetector>
    </Suspense>
  )
}
