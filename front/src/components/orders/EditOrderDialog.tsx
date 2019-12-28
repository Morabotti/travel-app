import React, { useState } from 'react'
import { OrderEditInnerForm, Customer, Travel, Order } from '@types'
import { Formik, Form } from 'formik'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { DialogButton, CustomerDialog, TravelDialog } from '.'
import { orderValidation } from '@utils/validation'
import { CustomCheckBox, CustomTextField } from '@components/common'

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
  onSubmit: (order: Order) => void,
  initialValues: OrderEditInnerForm | null
}

const EditOrderDialog = ({
  open,
  onClose,
  onSubmit,
  initialValues
}: Props) => {
  const classes = useStyles()
  const [selectingCustomer, setSelectingCustomer] = useState(false)
  const [selectingTravel, setSelectingTravel] = useState(false)

  const onCustomerSubmit = (
    data: OrderEditInnerForm
  ) => {
    if (
      data.startDate === null
      || data.endDate === null
      || data.customer === null
      || data.travel === null
    ) {
      return
    }

    const order: Order = {
      ...data,
      startDate: data.startDate.format('YYYY-MM-DD HH:MM:SS'),
      endDate: data.endDate.format('YYYY-MM-DD HH:MM:SS'),
      customer: (data.customer as Customer),
      travel: (data.travel as Travel),
      extraInfo: data.extraInfo === '' ? null : data.extraInfo
    }

    onSubmit(order)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Edit order</DialogTitle>
      {initialValues === null ? (
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      ) : (
        <DialogContent>
          <MuiPickersUtilsProvider locale='en' utils={MomentUtils}>
            <Formik
              initialValues={initialValues}
              onSubmit={onCustomerSubmit}
              validateOnBlur
              validateOnMount={false}
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
                  <CustomTextField
                    className={classes.double}
                    label='Extra info'
                    name='extraInfo'
                    multiline
                    type='input'
                  />
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
      )}
    </Dialog>
  )
}

export default EditOrderDialog
