import { useState, useEffect } from 'react'
import { Order, NewOrder } from '@types'
import { useInitialContext } from '@hooks'

import {
  fetchOrders,
  addOrder,
  deleteOrder
} from '@client'

interface OrdersContext {
  loading: boolean,
  error: boolean,
  orders: Order[],

  onNewOrder: (newOrder: NewOrder) => void,
  onConfirmDelete: () => void,

  isNewOrderDialog: boolean,
  isConfirmDialog: null | number,

  setNewOrderDialog: (set: boolean) => void,
  setConfirmDialog: (set: null | number) => void
}

export const useOrders = (): OrdersContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewOrderDialog, setStateNewOrderDialog] = useState(false)
  const [isConfirmDialog, setStateConfirmDialog] = useState<null | number>(null)
  const [orders, setOrders] = useState<Order[]>([])

  const getOrders = () => {
    fetchOrders()
      .then(o => {
        setError(false)
        setLoading(false)
        setOrders(o)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  const onNewOrder = (newOrder: NewOrder) => {
    addOrder(newOrder)
      .then(order => {
        setOrders([
          ...orders,
          {
            ...order,
            customer: newOrder.customer,
            travel: newOrder.travel
          }
        ])
        setStateNewOrderDialog(false)
      })
  }

  /*
  const onEditOrder = (editingOrder: Order) => {
    clientEdi(editingCustomer)
      .then(customer => {
        setCustomers(customers.map(i => i.id === customer.id ? customer : i))
        setEditCustomer(null)
      })
  }
  */

  const onConfirmDelete = () => {
    if (isConfirmDialog === null) {
      return
    }

    deleteOrder(isConfirmDialog)
      .then(() => {
        setOrders(orders.filter(i => i.id !== isConfirmDialog))
        setStateConfirmDialog(null)
      })
  }

  useEffect(() => {
    getOrders()
  }, [])

  const setNewOrderDialog = (set: boolean) => setStateNewOrderDialog(set)
  const setConfirmDialog = (set: null | number) => setStateConfirmDialog(set)
  /*
  const setEditCustomerDialog = (set: null | Customer) => setEditCustomer(set !== null ? {
    ...set,
    age: set.age.toString()
  } : null)
  */

  return {
    loading,
    error,
    orders,

    onNewOrder,
    onConfirmDelete,

    isNewOrderDialog,
    isConfirmDialog,

    setConfirmDialog,
    setNewOrderDialog
  }
}
