import { FC, LazyExoticComponent } from 'react'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { Moment } from 'moment'

export interface PublicRoutes {
  name: string,
  path: string,
  icon: (props: SvgIconProps) => JSX.Element,
  component: LazyExoticComponent<FC>
}

export type TravelType = 'culture' | 'trek' | 'sport' | 'beach' | 'city' | 'unknown'

export interface PrivateRoutes {
  path: string,
  component: LazyExoticComponent<FC>
}

export interface RequestContext {
  loading: boolean,
  error: boolean,
  setLoading: (set: boolean) => void,
  setError: (set: boolean) => void
}

export interface Customer {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  created: string
}

export interface NewCustomer {
  firstName: string,
  lastName: string,
  email: string,
  age: number
}

export interface CustomerForm {
  firstName: string,
  lastName: string,
  email: string,
  age: string
}

export interface CustomerEditForm {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  age: string,
  created: string
}

export interface Travel {
  id: number,
  travelCode: string,
  name: string,
  description: string,
  startingCity: string,
  destinationCity: string,
  guidedTour: boolean,
  cost: number,
  guide: null | string,
  travelType: TravelType
}

export interface NewTravel {
  travelCode: string,
  name: string,
  description: string,
  startingCity: string,
  destinationCity: string,
  guidedTour: boolean,
  cost: number,
  guide: null | string,
  travelType: TravelType
}

export interface TravelForm {
  travelCode: string,
  name: string,
  description: string,
  startingCity: string,
  destinationCity: string,
  guidedTour: boolean,
  cost: string,
  guide: null | string,
  travelType: string
}

export interface TravelEditForm {
  id: number,
  travelCode: string,
  name: string,
  description: string,
  startingCity: string,
  destinationCity: string,
  guidedTour: boolean,
  cost: string,
  guide: null | string,
  travelType: string
}

export interface Order {
  id: number,
  customer: Customer,
  travel: Travel,
  startDate: string,
  endDate: string,
  active: boolean,
  extraInfo: null | string
}

export interface OrderInnerForm {
  customer: Customer | null,
  travel: Travel | null,
  startDate: Moment | null,
  endDate: Moment | null,
  active: boolean,
  extraInfo: null | string
}

export interface OrderForm {
  customer: Customer,
  travel: Travel,
  startDate: string,
  endDate: string,
  active: boolean,
  extraInfo: null | string
}

export interface OrderEditForm {
  id: number,
  customer: Customer,
  travel: Travel,
  startDate: Moment,
  endDate: Moment,
  active: boolean,
  extraInfo: null | string
}

export interface OrderEditInnerForm {
  id: number,
  customer: Customer | null,
  travel: Travel | null,
  startDate: Moment | null,
  endDate: Moment | null,
  active: boolean,
  extraInfo: null | string
}

export interface NewOrder {
  customer: Customer,
  travel: Travel,
  startDate: string,
  endDate: string,
  active: boolean,
  extraInfo: null | string
}
