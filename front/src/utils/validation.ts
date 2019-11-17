import { CustomerForm, CustomerEditForm } from '@types'
import * as Yup from 'yup'

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(email)
}

export const validateCustomer = (data: CustomerForm | CustomerEditForm) => {
  const errors: Record<string, string> = {}

  if (data.firstName !== '') {
    if (data.firstName.length > 25) {
      errors.firstName = 'First name is too long'
    }
    else if (!isNaN(Number(data.firstName))) {
      errors.firstName = 'Not valid first name'
    }
  }

  if (data.lastName !== '') {
    if (data.lastName.length > 30) {
      errors.lastName = 'Last name is too long'
    }
    else if (!isNaN(Number(data.lastName))) {
      errors.lastName = 'Not valid last name'
    }
  }

  if (data.age !== '') {
    const num = Number(data.age)
    if (isNaN(num)) {
      errors.age = 'Not valid number'
    }
    else if (num > 120 || num < 5) {
      errors.age = 'Please enter a valid age'
    }
  }

  return errors
}

export const travelSchema = Yup.object().shape({
  travelCode: Yup.string()
    .min(4, 'Travel code too short')
    .max(30, 'Travel code too long')
    .required('Travel code is required'),
  name: Yup.string()
    .max(30, 'Name is too long')
    .required('Name is required'),
  description: Yup.string()
    .max(250, 'Too long description'),
  startingCity: Yup.string()
    .max(50, 'Travel starting place is too long')
    .required('Travel starting place is required'),
  destinationCity: Yup.string()
    .max(50, 'Travel destination is too long')
    .required('Travel destination is required'),
  guidedTour: Yup.boolean()
    .required(),
  cost: Yup.number()
    .typeError('Travel cost must be a number')
    .required('Travel cost is required'),
  guide: Yup.mixed(),
  travelType: Yup.string()
})
