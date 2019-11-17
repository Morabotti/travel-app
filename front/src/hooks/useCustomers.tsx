import { useState, useEffect } from 'react'
import { Customer, NewCustomer, CustomerEditForm } from '@types'
import { useInitialContext } from '@hooks'

import {
  fetchCustomers,
  addCustomer,
  deleteCustomer,
  editCustomer as clientEditCustomer
} from '@client'

interface CustomerContext {
  loading: boolean,
  error: boolean,
  customers: Customer[],
  editCustomer: CustomerEditForm | null,

  onNewCustomer: (newCustomer: NewCustomer) => void,
  onEditCustomer: (customer: Customer) => void,
  onConfirmDelete: () => void,

  isNewCustomerDialog: boolean,
  isConfirmDialog: null | number,

  setNewCustomerDialog: (set: boolean) => void,
  setConfirmDialog: (set: null | number) => void,
  setEditCustomerDialog: (set: null | Customer) => void
}

export const useCustomers = (): CustomerContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewCustomerDialog, setStateNewCustomerDialog] = useState(false)
  const [isConfirmDialog, setStateConfirmDialog] = useState<null | number>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [editCustomer, setEditCustomer] = useState<CustomerEditForm | null>(null)

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

  const onEditCustomer = (editingCustomer: Customer) => {
    clientEditCustomer(editingCustomer)
      .then(customer => {
        setCustomers(customers.map(i => i.id === customer.id ? customer : i))
        setEditCustomer(null)
      })
  }

  const onConfirmDelete = () => {
    if (isConfirmDialog === null) {
      return
    }

    deleteCustomer(isConfirmDialog)
      .then(() => {
        setCustomers(customers.filter(i => i.id !== isConfirmDialog))
        setStateConfirmDialog(null)
      })
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const setNewCustomerDialog = (set: boolean) => setStateNewCustomerDialog(set)
  const setConfirmDialog = (set: null | number) => setStateConfirmDialog(set)
  const setEditCustomerDialog = (set: null | Customer) => setEditCustomer(set !== null ? {
    ...set,
    age: set.age.toString()
  } : null)

  return {
    loading,
    error,
    customers,
    editCustomer,

    onNewCustomer,
    onConfirmDelete,
    onEditCustomer,

    isNewCustomerDialog,
    isConfirmDialog,

    setConfirmDialog,
    setNewCustomerDialog,
    setEditCustomerDialog
  }
}
