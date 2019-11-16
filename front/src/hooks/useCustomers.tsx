import { useState, useEffect } from 'react'
import { Customer } from '@types'
import { useInitialContext } from '@hooks'
import { fetchCustomers } from '@client'

interface CustomerContext {
  loading: boolean,
  error: boolean,
  customers: Customer[]
}

export const useCustomers = (): CustomerContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [customers, setCustomers] = useState<Customer[]>([])

  const getCustomers = () => {
    fetchCustomers()
      .then(c => {
        setError(false)
        setLoading(false)
        setCustomers(c)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return {
    loading,
    error,
    customers
  }
}
