import { useState, useEffect } from 'react'
import { Travel } from '@types'
import { useInitialContext } from '@hooks'
import { fetchTravels } from '@client'

interface TravelsContext {
  loading: boolean,
  error: boolean,
  travels: Travel[]
}

export const useTravels = (): TravelsContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [travels, setTravels] = useState<Travel[]>([])

  const getTravels = () => {
    fetchTravels()
      .then(t => {
        setError(false)
        setLoading(false)
        setTravels(t)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    getTravels()
  }, [])

  return {
    loading,
    error,
    travels
  }
}
