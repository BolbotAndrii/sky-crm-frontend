import { useState, useEffect } from 'react'
import { getOfficeItegrationById } from 'api/office'

export const useIntegration = (integrationId: string) => {
  const [integration, setIntegration] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchIntegration = async () => {
      setLoading(true)
      try {
        const res = await getOfficeItegrationById({ id: integrationId })
        setIntegration(res)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (integrationId !== 'new') fetchIntegration()
  }, [integrationId])

  return { integration, loading, error }
}
