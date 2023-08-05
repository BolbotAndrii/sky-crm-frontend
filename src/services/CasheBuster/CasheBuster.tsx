import React, { useEffect, useState } from 'react'

import packageJson from '../../../package.json'

global.appVersion = packageJson.version

interface CacheBusterCallbackProps {
  loading: boolean;
  isLatestVersion: boolean;
  refreshCacheAndReload: () => void;
}

interface CacheBusterProps {
  children: (props: CacheBusterCallbackProps) => React.ReactNode;
}

const semverGreaterThan = (versionA, versionB)=> {
  const versionsA = versionA.split(/\./g)

  const versionsB = versionB.split(/\./g)
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift())

    const b = Number(versionsB.shift())

    if (a === b) continue

    return a > b || isNaN(b)
  }
  return false
}

const CacheBuster = ({ children }:CacheBusterProps)  => {
  const [state, setState] = useState<{loading:boolean,isLatestVersion:boolean}>({
    loading: true,
    isLatestVersion: false,
  })

  const fetchMeta = () => {
    fetch('/meta.json')
      .then(res => res.json())
      .then(meta => {
        const latestVersion = meta.version
        const currentVersion = global.appVersion

        console.log({ latestVersion }, { currentVersion })

        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion,
        )
        if (shouldForceRefresh) {
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`,
          )
          setState(prev => ({
            ...prev,
            loading: false,
            isLatestVersion: false,
          }))
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`,
          )
          setState(prev => ({ ...prev, loading: false, isLatestVersion: true }))
        }
      })
  }

  useEffect(() => {
    fetchMeta()
  }, [])

  useEffect(() => {
    console.log(`You changed the page to: ${window.location.pathname}`)

    fetchMeta()
  }, [window.location.pathname])

  const refreshCacheAndReload = async () => {
    console.log('Clearing cache and local storage and hard reloading...')

    // Service worker cache should be cleared with caches.delete()
    if (caches) {
      caches.keys().then(names => {
        for (let name of names) caches.delete(name)
      })
    }
    // localStorage?.clear?.()

    // delete browser cache and hard reload
    window.location.reload(true)
  }
  const { loading, isLatestVersion } = state

  return children({ loading, isLatestVersion, refreshCacheAndReload })
}

export default CacheBuster
