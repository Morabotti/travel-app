import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useInitialContext } from '@hooks'
import { fetchCustomer, fetchCustomerOrders } from '@client'
import { Customer, RequestContext, Order } from '@types'

interface CustomerContext {
  customerRequest: RequestContext,
  orderRequest: RequestContext,
  customer: Customer | null,
  orders: Order[]
}

export const useCustomer = (): CustomerContext => {
  const { id } = useParams()
  const [customer, setCustomer] = useState<null | Customer>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const customerRequest = useInitialContext(false, true)
  const orderRequest = useInitialContext(false, true)

  const getCustomer = () => {
    const customerId = Number(id)
    if (isNaN(customerId)) {
      return
    }

    fetchCustomer(customerId)
      .then(c => {
        customerRequest.setLoading(false)
        customerRequest.setError(false)
        setCustomer(c)
        fetchCustomerOrders(c.id)
          .then(o => {
            orderRequest.setLoading(false)
            orderRequest.setError(false)
            setOrders(o)
          })
      })
      .catch(() => {
        customerRequest.setLoading(false)
        customerRequest.setError(true)
        orderRequest.setLoading(false)
        orderRequest.setError(true)
        setCustomer(null)
      })
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return {
    customer,
    customerRequest,
    orderRequest,
    orders
  }
}
