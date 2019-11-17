import React, { Fragment } from 'react'
import { Customer } from '@types'
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
  customer: Customer | null,
  error: boolean
}

const CustomerDetails = ({
  customer,
  error
}: Props) => {
  const classes = useStyles()

  if (!customer) {
    return <Fragment />
  }

  if (error) {
    return (
      <div>
        <T variant='subtitle1' className={classes.error}>Failed to load customer details!</T>
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
          <T>{customer.id}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Name</T>
        </Grid>
        <Grid item xs={10}>
          <T>{customer.firstName} {customer.lastName}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Email</T>
        </Grid>
        <Grid item xs={10}>
          <T>{customer.email}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Age</T>
        </Grid>
        <Grid item xs={10}>
          <T>{customer.age}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Created</T>
        </Grid>
        <Grid item xs={10}>
          <T>{toLocalDate(customer.created)}</T>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerDetails
