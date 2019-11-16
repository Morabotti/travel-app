import { useState } from 'react'

interface ValidationContext {
  validating: boolean,
  isValid: null | boolean,
  latest: string,

  setLatest: (set: string) => void,
  setValid: (set: null | boolean) => void,
  setValidating: (set: boolean) => void
}

export const useValidation = (): ValidationContext => {
  const [validating, setStateValidating] = useState(false)
  const [isValid, setStateValid] = useState<null | boolean>(null)
  const [latest, setStateLatest] = useState<string>('')

  const setLatest = (set: string) => setStateLatest(set)
  const setValid = (set: null | boolean) => setStateValid(set)
  const setValidating = (set: boolean) => setStateValidating(set)

  return {
    validating,
    isValid,
    latest,
    setLatest,
    setValid,
    setValidating
  }
}
