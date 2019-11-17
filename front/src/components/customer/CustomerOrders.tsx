import React, { Fragment } from 'react'
import { Order } from '@types'

import {
  createStyles,
  makeStyles,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    error: {
      color: theme.palette.error.main
    }
  })
)

interface Props {
  orders: Order[] | null,
  error: boolean
}

const CustomerOrders = ({
  orders,
  error
}: Props) => {
  const classes = useStyles()

  if (!orders) {
    return <Fragment />
  }

  if (error) {
    return (
      <div>
        <T variant='subtitle1' className={classes.error}>Failed to load customer orders!</T>
      </div>
    )
  }

  return (
    <div>
      <T>TODO</T>
    </div>
  )
}

export default CustomerOrders
