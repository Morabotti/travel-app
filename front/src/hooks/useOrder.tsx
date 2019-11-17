import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useInitialContext } from '@hooks'
import { fetchOrder } from '@client'
import { Order } from '@types'

interface OrderContext {
  order: Order | null,
  loading: boolean,
  error: boolean
}

export const useOrder = (): OrderContext => {
  const { loading, error, setLoading, setError } = useInitialContext(false, true)
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)

  const getOrder = () => {
    const orderId = Number(id)
    if (isNaN(orderId)) {
      return
    }

    fetchOrder(orderId)
      .then(o => {
        setLoading(false)
        setError(false)
        setOrder(o)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  useEffect(() => {
    getOrder()
  }, [])

  return {
    order,
    error,
    loading
  }
}
