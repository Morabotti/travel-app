import React, { useState } from 'react'
import { NewOrder, OrderInnerForm, Customer, Travel } from '@types'
import { Formik, Form } from 'formik'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { DialogButton, CustomerDialog, TravelDialog } from '.'
import { orderValidation } from '@utils/validation'
import { CustomCheckBox } from '@components/common'
import moment from 'moment'

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
  onSubmit: (order: NewOrder) => void
}

const initialValues: OrderInnerForm = {
  customer: null,
  travel: null,
  startDate: moment(),
  endDate: moment().add(7, 'day'),
  active: true
}

const NewOrderDialog = ({
  open,
  onClose,
  onSubmit
}: Props) => {
  const classes = useStyles()
  const [selectingCustomer, setSelectingCustomer] = useState(false)
  const [selectingTravel, setSelectingTravel] = useState(false)

  const onCustomerSubmit = (
    data: OrderInnerForm
  ) => {
    if (
      data.startDate === null
      || data.endDate === null
      || data.customer === null
      || data.travel === null
    ) {
      return
    }

    const newOrder: NewOrder = {
      ...data,
      startDate: data.startDate.format('YYYY-MM-DD HH:MM:SS'),
      endDate: data.startDate.format('YYYY-MM-DD HH:MM:SS'),
      customer: (data.customer as Customer),
      travel: (data.travel as Travel)
    }

    onSubmit(newOrder)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Add new order</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider locale='en' utils={MomentUtils}>
          <Formik
            initialValues={initialValues}
            onSubmit={onCustomerSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={orderValidation}
          >
            {({ values, setValues, errors }) => (
              <Form>
                <DialogButton
                  label='Select a customer'
                  value={values.customer !== null
                    ? `(${values.customer.id}) ${values.customer.firstName} ${values.customer.lastName} (${values.customer.email})`
                    : ''
                  }
                  fullWidth
                  error={errors.customer}
                  className={classes.double}
                  onClick={() => setSelectingCustomer(true)}
                >
                  <CustomerDialog
                    open={selectingCustomer}
                    onClose={() => setSelectingCustomer(false)}
                    onSelect={select => {
                      setSelectingCustomer(false)
                      setValues({
                        ...values,
                        customer: select
                      })
                    }}
                  />
                </DialogButton>
                <DialogButton
                  label='Select a travel'
                  value={values.travel !== null
                    ? `(${values.travel.id}) ${values.travel.startingCity}-${values.travel.destinationCity} (${values.travel.travelCode})`
                    : ''
                  }
                  fullWidth
                  error={errors.travel}
                  className={classes.double}
                  onClick={() => setSelectingTravel(true)}
                >
                  <TravelDialog
                    open={selectingTravel}
                    onClose={() => setSelectingTravel(false)}
                    onSelect={select => {
                      setSelectingTravel(false)
                      setValues({
                        ...values,
                        travel: select
                      })
                    }}
                  />
                </DialogButton>
                <Grid className={classes.default} container spacing={2}>
                  <Grid item xs={6}>
                    <DateTimePicker
                      autoOk
                      fullWidth
                      error={errors.startDate !== undefined}
                      inputVariant='standard'
                      ampm={false}
                      value={values.startDate}
                      showTodayButton
                      onChange={date => setValues({
                        ...values,
                        startDate: date
                      })}
                      label='Start date'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      autoOk
                      fullWidth
                      error={errors.endDate !== undefined}
                      inputVariant='standard'
                      ampm={false}
                      value={values.endDate}
                      showTodayButton
                      onChange={date => setValues({
                        ...values,
                        endDate: date
                      })}
                      label='End date'
                    />
                  </Grid>
                </Grid>
                <CustomCheckBox
                  label='Is order active'
                  name='active'
                  type='checkbox'
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
        </MuiPickersUtilsProvider>
      </DialogContent>
    </Dialog>
  )
}

export default NewOrderDialog
