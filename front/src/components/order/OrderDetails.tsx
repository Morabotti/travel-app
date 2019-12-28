import React, { Fragment } from 'react'
import { Order } from '@types'
import { toLocalDate } from '@utils/dates'

import {
  createStyles,
  makeStyles,
  Grid,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    key: {
      fontWeight: 600
    },
    error: {
      color: theme.palette.error.main
    }
  })
)

interface Props {
  order: Order | null,
  error: boolean
}

const CustomerDetails = ({
  order,
  error
}: Props) => {
  const classes = useStyles()

  if (!order) {
    return <Fragment />
  }

  if (error) {
    return (
      <div>
        <T variant='subtitle1' className={classes.error}>Failed to load order details!</T>
      </div>
    )
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <T className={classes.key}>ID</T>
        </Grid>
        <Grid item xs={10}>
          <T>{order.id}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Customer</T>
        </Grid>
        <Grid item xs={10}>
          <T>{order.customer.firstName} {order.customer.lastName} ({order.customer.email})</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Travel</T>
        </Grid>
        <Grid item xs={10}>
          <T>{order.travel.startingCity} - {order.travel.destinationCity} ({order.travel.name})</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Start date</T>
        </Grid>
        <Grid item xs={10}>
          <T>{toLocalDate(order.startDate)}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>End date</T>
        </Grid>
        <Grid item xs={10}>
          <T>{toLocalDate(order.endDate)}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Extra info</T>
        </Grid>
        <Grid item xs={10}>
          <T>{order.extraInfo === null ? 'Not set!' : order.extraInfo}</T>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerDetails
