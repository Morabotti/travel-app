import React from 'react'
import { CustomerForm, NewCustomer } from '@types'
import { CustomTextField, EmailTextField } from '@components/common'
import { validateCustomer, validateEmail } from '@utils/validation'
import { validateEmailOnServer } from '@client'
import { useValidation } from '@hooks'
import { Formik, Form } from 'formik'

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    default: {
      marginBottom: theme.spacing(1)
    },
    double: {
      marginBottom: theme.spacing(2)
    },
    action: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(1)
    },
    secondary: {
      marginRight: theme.spacing(1)
    }
  })
)

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (customer: NewCustomer) => void
}

const initialValues: CustomerForm = {
  firstName: '',
  lastName: '',
  email: '',
  age: '18'
}

const NewCustomerDialog = ({
  open,
  onClose,
  onSubmit
}: Props) => {
  let timer: NodeJS.Timeout
  const classes = useStyles()

  const {
    validating,
    isValid,
    latest,
    setValid,
    setValidating,
    setLatest
  } = useValidation()

  const onCustomerSubmit = (
    data: CustomerForm
  ) => {
    if (!isValid || validating) {
      return
    }

    const newCustomer: NewCustomer = {
      ...data,
      age: Number(data.age)
    }

    onSubmit(newCustomer)
  }

  const debounceEmail = (email: string) => () => {
    setValidating(true)
    setLatest(email)
    validateEmailOnServer(email)
      .then(bool => {
        setValid(bool)
        setValidating(false)
      })
  }

  const onEmailValidate = (email: string) => {
    let error

    if (email !== '') {
      if (validateEmail(email)) {
        error = 'Invalid email address'
      }
      else {
        if (latest !== email) {
          setValid(null)
          clearTimeout(timer)
          timer = setTimeout(debounceEmail(email), 500)
        }
      }
    }

    return error
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Add new customer</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onCustomerSubmit}
          validate={validateCustomer}
        >
          {() => (
            <Form>
              <Grid className={classes.default} container spacing={2}>
                <Grid item xs={6}>
                  <CustomTextField
                    label='First Name'
                    name='firstName'
                    type='input'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label='Last Name'
                    name='lastName'
                    type='input'
                  />
                </Grid>
              </Grid>
              <EmailTextField
                className={classes.double}
                label='Email'
                name='email'
                type='email'
                isValid={isValid}
                loading={validating}
                validate={onEmailValidate}
              />
              <CustomTextField
                className={classes.double}
                label='Age'
                name='age'
                type='input'
              />
              <div className={classes.action}>
                <Button
                  color='secondary'
                  className={classes.secondary}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button type='submit' color='primary'>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default NewCustomerDialog
