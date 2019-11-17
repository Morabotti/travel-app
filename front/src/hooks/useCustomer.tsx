import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useInitialContext } from '@hooks'
import { fetchCustomer } from '@client'
import { Customer, RequestContext } from '@types'

interface CustomerContext {
  customerRequest: RequestContext,
  orderRequest: RequestContext,
  customer: Customer | null
}

export const useCustomer = (): CustomerContext => {
  const { id } = useParams()
  const [customer, setCustomer] = useState<null | Customer>(null)
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
      })
      .catch(() => {
        customerRequest.setLoading(false)
        customerRequest.setError(true)
        setCustomer(null)
      })
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return {
    customer,
    customerRequest,
    orderRequest
  }
}
