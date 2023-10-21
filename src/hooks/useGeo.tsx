import { useState, useEffect } from 'react'

import { getGeo } from 'api/geo'

export const useGeo = (officeId: string) => {
  const [geo, setGeo] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchIntegration = async () => {
      setLoading(true)
      try {
        const res = await getGeo({ officeId })
        setGeo(res)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (officeId !== 'new') fetchIntegration()
  }, [officeId])

  return { geo, loading, error }
}
