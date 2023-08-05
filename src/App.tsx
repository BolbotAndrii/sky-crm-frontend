import React, { Suspense } from 'react'
import { Spin } from 'antd'
import store from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import CookiesDetector from 'services/CookiesDetector/CookiesDetector'
import { Builder } from 'Builder'
import CacheBuster from 'services/CasheBuster/CasheBuster'
import './styles/index.scss'

export const App = () => {
  return (
    <Suspense fallback={<Spin />}>
      <CookiesDetector>
        <Provider store={store}>
          <ErrorBoundary>
            <CacheBuster>
              {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return <Spin />
                if (!loading && !isLatestVersion) refreshCacheAndReload()

                return <Builder />
              }}
            </CacheBuster>
          </ErrorBoundary>
        </Provider>
      </CookiesDetector>
    </Suspense>
  )
}
