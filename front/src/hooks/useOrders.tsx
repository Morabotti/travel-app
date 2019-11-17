import { useState, useEffect } from 'react'
import { Order, NewOrder, OrderEditForm } from '@types'
import { useInitialContext } from '@hooks'
import moment from 'moment'

import {
  fetchOrders,
  addOrder,
  deleteOrder,
  editOrder as clientEditOrder
} from '@client'

interface OrdersContext {
  loading: boolean,
  error: boolean,
  orders: Order[],
  editOrder: OrderEditForm | null,

  onNewOrder: (newOrder: NewOrder) => void,
  onEditOrder: (order: Order) => void,
  onConfirmDelete: () => void,

  isNewOrderDialog: boolean,
  isConfirmDialog: null | number,

  setNewOrderDialog: (set: boolean) => void,
  setConfirmDialog: (set: null | number) => void,
  setEditOrderDialog: (set: null | Order) => void
}

export const useOrders = (): OrdersContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewOrderDialog, setStateNewOrderDialog] = useState(false)
  const [isConfirmDialog, setStateConfirmDialog] = useState<null | number>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [editOrder, setEditOrder] = useState<OrderEditForm | null>(null)

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

  const onEditOrder = (editingOrder: Order) => {
    clientEditOrder(editingOrder)
      .then(order => {
        setOrders(orders.map(i => i.id === order.id ? order : i))
        setEditOrder(null)
      })
  }

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
  const setEditOrderDialog = (set: null | Order) => setEditOrder(set !== null ? {
    ...set,
    startDate: moment(set.startDate),
    endDate: moment(set.endDate)
  } : null)

  return {
    loading,
    error,
    orders,
    editOrder,

    onNewOrder,
    onConfirmDelete,
    onEditOrder,

    isNewOrderDialog,
    isConfirmDialog,

    setConfirmDialog,
    setNewOrderDialog,
    setEditOrderDialog
  }
}
