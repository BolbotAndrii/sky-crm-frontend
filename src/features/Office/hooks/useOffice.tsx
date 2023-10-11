import { useState, useEffect } from 'react'
import { getOfficeById } from 'api/office'

export const useOffice = officeId => {
  const [office, setOffice] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchOffice = async () => {
      setLoading(true)
      try {
        const res = await getOfficeById({ officeId })
        setOffice(res)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (officeId && officeId !== 'new') fetchOffice()
  }, [officeId])

  return { office, loading, error }
}
