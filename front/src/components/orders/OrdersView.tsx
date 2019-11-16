import React, { FC } from 'react'

import {
  createStyles,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({

  })
)

const OrdersView: FC = () => {
  const classes = useStyles()

  return (
    <div>
      orders
    </div>
  )
}

export default OrdersView
