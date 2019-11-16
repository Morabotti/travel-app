import { useState, useEffect } from 'react'
import { Customer, NewCustomer } from '@types'
import { useInitialContext } from '@hooks'
import { fetchCustomers, addCustomer } from '@client'

interface CustomerContext {
  loading: boolean,
  error: boolean,
  customers: Customer[],
  onNewCustomer: (newCustomer: NewCustomer) => void,

  isNewCustomerDialog: boolean,

  setNewCustomerDialog: (set: boolean) => void
}

export const useCustomers = (): CustomerContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewCustomerDialog, setStateNewCustomerDialog] = useState(false)
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

  const onNewCustomer = (newCustomer: NewCustomer) => {
    addCustomer(newCustomer)
      .then(customer => {
        setCustomers([...customers, customer])
        setStateNewCustomerDialog(false)
      })
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const setNewCustomerDialog = (set: boolean) => setStateNewCustomerDialog(set)

  return {
    loading,
    error,
    customers,
    onNewCustomer,

    isNewCustomerDialog,

    setNewCustomerDialog
  }
}
