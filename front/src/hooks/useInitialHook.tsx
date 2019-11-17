import { useState } from 'react'
import { RequestContext } from '@types'

export const useInitialContext = (
  initialError: boolean,
  initialLoading: boolean
): RequestContext => {
  const [error, setStateError] = useState(initialError)
  const [loading, setStateLoading] = useState(initialLoading)

  const setLoading = (set: boolean) => setStateLoading(set)
  const setError = (set: boolean) => setStateError(set)

  return {
    error,
    loading,
    setLoading,
    setError
  }
}
