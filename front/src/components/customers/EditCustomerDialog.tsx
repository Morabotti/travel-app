import React, { useEffect, useState } from 'react'
import { CustomerEditForm, Customer } from '@types'
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
  Grid,
  LinearProgress
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
  onSubmit: (customer: Customer) => void,
  initialValues: CustomerEditForm | null
}

const EditCustomerDialog = ({
  open,
  onClose,
  onSubmit,
  initialValues
}: Props) => {
  let timer: NodeJS.Timeout
  const classes = useStyles()
  const [initialEmail, setInitialEmail] = useState<null | string>(null)

  const {
    validating,
    isValid,
    latest,
    setValid,
    setValidating,
    setLatest
  } = useValidation()

  const onCustomerSubmit = (
    data: CustomerEditForm
  ) => {
    if ((!isValid || validating) && initialEmail !== data.email) {
      return
    }

    const customer: Customer = {
      ...data,
      age: Number(data.age)
    }

    onSubmit(customer)
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
        if (latest !== email && email !== initialEmail) {
          setValid(null)
          clearTimeout(timer)
          timer = setTimeout(debounceEmail(email), 500)
        }
      }
    }

    return error
  }

  useEffect(() => {
    if (open && initialValues) {
      setInitialEmail(initialValues.email)
    }
    else {
      setInitialEmail(null)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Edit customer</DialogTitle>
      {initialValues === null ? (
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      ) : (
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
      )}
    </Dialog>
  )
}

export default EditCustomerDialog
