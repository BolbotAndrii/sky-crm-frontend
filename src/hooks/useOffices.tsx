import { useState, useEffect } from 'react'
import { getOffices } from 'api/office'

export const useOffice = () => {
  const [office, setOffice] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchOffice = async () => {
      setLoading(true)
      try {
        const res = await getOffices()
        setOffice(res)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchOffice()
  }, [])

  return { office, loading, error }
}
