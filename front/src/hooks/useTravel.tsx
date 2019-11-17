import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useInitialContext } from '@hooks'
import { fetchTravel } from '@client'
import { RequestContext, Travel } from '@types'

interface TravelContext {
  travelRequest: RequestContext,
  orderRequest: RequestContext,
  travel: Travel | null
}

export const useTravel = (): TravelContext => {
  const { id } = useParams()
  const [travel, setTravel] = useState<null | Travel>(null)
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
      })
      .catch(() => {
        travelRequest.setLoading(false)
        travelRequest.setError(true)
        setTravel(null)
      })
  }

  useEffect(() => {
    getTravel()
  }, [])

  return {
    travel,
    travelRequest,
    orderRequest
  }
}
