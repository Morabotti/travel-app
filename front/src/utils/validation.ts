import { CustomerForm } from '@types'

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(email)
}

export const validateNewCustomer = (data: CustomerForm) => {
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
