import { useState } from 'react'

interface InitialContext {
  loading: boolean,
  error: boolean,

  setLoading: (set: boolean) => void,
  setError: (set: boolean) => void
}

export const useInitialContext = (
  initialError: boolean,
  initialLoading: boolean
): InitialContext => {
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
