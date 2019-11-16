import React from 'react'
import { Customer } from '@types'
import { toLocalDate } from '@utils/dates'

import {
  makeStyles,
  createStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    th: {
      lineHeight: 1
    }
  })
)

interface Props {
  customers: Customer[]
}

const CustomerTable = ({
  customers
}: Props) => {
  const classes = useStyles()
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.th} component='th'>Name</TableCell>
          <TableCell className={classes.th} component='th'>Age</TableCell>
          <TableCell className={classes.th} component='th'>Email</TableCell>
          <TableCell className={classes.th} component='th'>Created</TableCell>
          <TableCell className={classes.th} component='th' />
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map(customer => (
          <TableRow>
            <TableCell component='td'>{customer.firstName} {customer.lastName}</TableCell>
            <TableCell component='td'>{customer.age}</TableCell>
            <TableCell component='td'>{customer.email}</TableCell>
            <TableCell component='td'>{toLocalDate(customer.created)}</TableCell>
            <TableCell component='td' />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CustomerTable
