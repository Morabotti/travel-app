import React from 'react'
import { Order } from '@types'
import { EyeOutline } from 'mdi-material-ui'
import { useHistory } from 'react-router'
import { toLocalDate } from '@utils/dates'
import { PaginationFooter } from '@components/common'
import { usePagination } from '@hooks'
import clsx from 'clsx'

import {
  createStyles,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    th: {
      fontWeight: 600,
      lineHeight: 1
    },
    small: {
      padding: theme.spacing(1)
    },
    offset: {
      marginRight: theme.spacing(2)
    },
    actions: {
      padding: theme.spacing(0)
    },
    thLast: {
      width: '160px'
    }
  })
)

interface Props {
  orders: Order[]
}

const CustomerOrders = ({
  orders
}: Props) => {
  const classes = useStyles()
  const { offset, limit, setOffset, filterPagination } = usePagination(5)
  const { push } = useHistory()

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.th} component='th'>Customers</TableCell>
            <TableCell className={classes.th} component='th'>Travels</TableCell>
            <TableCell className={classes.th} component='th'>Start date</TableCell>
            <TableCell className={classes.th} component='th'>End date</TableCell>
            <TableCell className={classes.th} component='th'>Active</TableCell>
            <TableCell className={classes.thLast} component='th' />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.filter(filterPagination(offset, limit))
            .map(order => (
              <TableRow key={order.id} className='contains-inv-actions'>
                <TableCell component='td'>
                  ({order.customer.id}) {order.customer.firstName} {order.customer.lastName}
                </TableCell>
                <TableCell component='td'>
                  ({order.travel.id}) {order.travel.startingCity} - {order.travel.destinationCity}
                </TableCell>
                <TableCell component='td'>{toLocalDate(order.startDate)}</TableCell>
                <TableCell component='td'>{toLocalDate(order.endDate)}</TableCell>
                <TableCell component='td'>{order.active ? 'Yes' : 'No'}</TableCell>
                <TableCell component='td' className={classes.actions}>
                  <div className='inv-actions'>
                    <Tooltip title='View order' placement='top'>
                      <IconButton
                        className={clsx(classes.small, classes.offset)}
                        onClick={() => push(`/orders/${order.id}`)}
                      >
                        <EyeOutline />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
            )}
        </TableBody>
      </Table>
      <PaginationFooter
        offset={offset}
        setOffset={setOffset}
        limit={limit}
        length={orders.length}
      />
    </>
  )
}

export default CustomerOrders
