import { Customer, NewCustomer, Travel, NewTravel } from '@types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const validateEmailOnServer = (
  email: string
): Promise<boolean> => fetch(
  '/api/customer/validate',
  {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchTravels = (): Promise<Travel[]> => fetch(
  '/api/travel',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchTravel = (id: number): Promise<Travel> => fetch(
  `/api/travel/${id}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addTravel = (
  travel: NewTravel
): Promise<Travel> => fetch(
  `/api/travel`,
  {
    method: 'POST',
    body: JSON.stringify(travel),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const editTravel = (
  travel: Travel
): Promise<Travel> => fetch(
  `/api/travel`,
  {
    method: 'PUT',
    body: JSON.stringify(travel),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const deleteTravel = (id: number): Promise<Response> => fetch(
  `/api/travel/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const fetchCustomers = (): Promise<Customer[]> => fetch(
  '/api/customer',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchCustomer = (id: number): Promise<Customer> => fetch(
  `/api/customer/${id}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const deleteCustomer = (id: number): Promise<Response> => fetch(
  `/api/customer/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const addCustomer = (
  customer: NewCustomer
): Promise<Customer> => fetch(
  `/api/customer`,
  {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const editCustomer = (
  customer: Customer
): Promise<Customer> => fetch(
  `/api/customer`,
  {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())