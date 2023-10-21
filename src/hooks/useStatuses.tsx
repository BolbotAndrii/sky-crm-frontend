import { useState, useEffect } from 'react'

import { getStatusRequest } from 'api/status'

export const useStatuses = (officeId: string) => {
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchIntegration = async () => {
      setLoading(true)
      try {
        const res = await getStatusRequest({ officeId: officeId })
        setStatuses(res)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (officeId !== 'new') fetchIntegration()
  }, [officeId])

  return { statuses, loading, error }
}
