import React from 'react'
import { TravelForm, NewTravel, TravelType } from '@types'
import { CustomTextField, CustomCheckBox, CustomSelect } from '@components/common'
import { travelSchema } from '@utils/validation'
import { travelTypes } from '@utils/list'
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
    },
    vertical: {
      alignSelf: 'center'
    }
  })
)

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (customer: NewTravel) => void
}

const initialValues: TravelForm = {
  travelCode: '',
  name: '',
  description: '',
  startingCity: '',
  destinationCity: '',
  guidedTour: false,
  cost: '',
  guide: '',
  travelType: 'unknown'
}

const NewTravelDialog = ({
  open,
  onClose,
  onSubmit
}: Props) => {
  const classes = useStyles()

  const onTravelSubmit = (
    data: TravelForm
  ) => {
    const newTravel: NewTravel = {
      ...data,
      cost: Number(data.cost),
      guide: (!data.guidedTour || data.guide === '') ? null : data.guide,
      travelType: (data.travelType as TravelType)
    }

    onSubmit(newTravel)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Add new travel</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onTravelSubmit}
          validationSchema={travelSchema}
        >
          {({ values }) => (
            <Form>
              <CustomTextField
                className={classes.double}
                label='Travel code'
                name='travelCode'
                type='input'
              />
              <CustomTextField
                className={classes.double}
                label='Name'
                name='name'
                type='input'
              />
              <CustomTextField
                className={classes.double}
                label='Description'
                name='description'
                multiline
                type='input'
              />
              <Grid className={classes.default} container spacing={2}>
                <Grid item xs={6}>
                  <CustomTextField
                    label='Starting city'
                    name='startingCity'
                    type='input'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label='Destination city'
                    name='destinationCity'
                    type='input'
                  />
                </Grid>
                <Grid item xs={6} className={classes.vertical}>
                  <CustomCheckBox
                    label='Is travel guided'
                    name='guidedTour'
                    type='checkbox'
                  />
                </Grid>
                <Grid item xs={6}>
                  {values.guidedTour && (
                    <CustomTextField
                      label={`Guide's name`}
                      name='guide'
                      type='input'
                    />
                  )}
                </Grid>
              </Grid>
              <CustomTextField
                className={classes.double}
                label='Cost'
                name='cost'
                startAdornment='€'
                type='input'
              />
              <CustomSelect
                name='travelType'
                label='Travel type'
                className={classes.double}
                options={travelTypes}
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

export default NewTravelDialog
