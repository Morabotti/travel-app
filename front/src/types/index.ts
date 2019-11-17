import { LazyExoticComponent, FC } from 'react'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

export interface PublicRoutes {
  name: string,
  path: string,
  icon: (props: SvgIconProps) => JSX.Element,
  component: LazyExoticComponent<FC>
}

export type TravelType = 'culture' | 'trek' | 'sport' | 'beach' | 'city' | 'unknown'

export interface PrivateRoutes {
  name: string,
  path: string,
  component: LazyExoticComponent<FC>
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

export interface Order {
  id: number,
  customer: Customer,
  travel: Travel,
  startDate: string,
  endDate: string,
  active: boolean
}

export interface NewOrder {
  customer: Customer,
  travel: Travel,
  startDate: string,
  endDate: string,
  active: boolean
}
