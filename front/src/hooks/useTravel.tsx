import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useInitialContext } from '@hooks'
import { fetchTravel, fetchTravelOrders } from '@client'
import { RequestContext, Travel, Order } from '@types'

interface TravelContext {
  travelRequest: RequestContext,
  orderRequest: RequestContext,
  travel: Travel | null,
  orders: Order[]
}

export const useTravel = (): TravelContext => {
  const { id } = useParams()
  const [travel, setTravel] = useState<null | Travel>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const travelRequest = useInitialContext(false, true)
  const orderRequest = useInitialContext(false, true)

  const getTravel = () => {
    const travelId = Number(id)
    if (isNaN(travelId)) {
      return
    }

    fetchTravel(travelId)
      .then(t => {
        travelRequest.setLoading(false)
        travelRequest.setError(false)
        setTravel(t)
        fetchTravelOrders(t.id)
          .then(o => {
            orderRequest.setLoading(false)
            orderRequest.setError(false)
            setOrders(o)
          })
      })
      .catch(() => {
        travelRequest.setLoading(false)
        travelRequest.setError(true)
        orderRequest.setLoading(false)
        orderRequest.setError(true)
        setTravel(null)
      })
  }

  useEffect(() => {
    getTravel()
  }, [])

  return {
    travel,
    travelRequest,
    orderRequest,
    orders
  }
}
