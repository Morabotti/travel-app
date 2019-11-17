import React from 'react'
import { Customer } from '@types'
import { toLocalDate } from '@utils/dates'
import { usePagination, filterPagination } from '@hooks'
import { PaginationFooter } from '@components/common'
import { PencilOutline, DeleteOutline, AccountOutline } from 'mdi-material-ui'
import clsx from 'clsx'

import {
  makeStyles,
  createStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
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
  customers: Customer[],
  setConfirmDialog: (set: number | null) => void,
  setEditDialog: (set: null | Customer) => void
}

const CustomerTable = ({
  customers,
  setConfirmDialog,
  setEditDialog
}: Props) => {
  const { offset, limit, setOffset } = usePagination(15)
  const classes = useStyles()

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.th} component='th'>Name</TableCell>
            <TableCell className={classes.th} component='th'>Age</TableCell>
            <TableCell className={classes.th} component='th'>Email</TableCell>
            <TableCell className={classes.th} component='th'>Created</TableCell>
            <TableCell className={classes.thLast} component='th' />
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.filter(filterPagination(offset, limit))
            .map(customer => (
              <TableRow key={customer.id} className='contains-inv-actions'>
                <TableCell component='td'>{customer.firstName} {customer.lastName}</TableCell>
                <TableCell component='td'>{customer.age}</TableCell>
                <TableCell component='td'>{customer.email}</TableCell>
                <TableCell component='td'>{toLocalDate(customer.created)}</TableCell>
                <TableCell component='td' className={classes.actions}>
                  <div className='inv-actions'>
                    <Tooltip title='Edit customer' placement='top'>
                      <IconButton
                        className={clsx(classes.small, classes.offset)}
                        onClick={() => setEditDialog(customer)}
                      >
                        <PencilOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete customer' placement='top'>
                      <IconButton
                        className={clsx(classes.small, classes.offset)}
                        onClick={() => setConfirmDialog(customer.id)}>
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='View customer' placement='top'>
                      <IconButton
                        className={classes.small}
                        onClick={() => {}}
                      >
                        <AccountOutline />
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
        length={customers.length}
      />
    </>
  )
}

export default CustomerTable
