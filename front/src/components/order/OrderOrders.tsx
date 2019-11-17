import React, { Fragment } from 'react'
import { Order } from '@types'
import { ViewOrderHistory } from '@components/common'
import { createStyles, makeStyles, Typography as T } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    error: {
      color: theme.palette.error.main
    }
  })
)

interface Props {
  orders: Order[],
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

  if (orders.length === 0) {
    return (
      <div>
        <T variant='subtitle1'>No orders were found with this customer.</T>
      </div>
    )
  }

  return (
    <div>
      <ViewOrderHistory orders={orders} />
    </div>
  )
}

export default CustomerOrders
