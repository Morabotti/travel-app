import React, { useState, useEffect } from 'react'
import { Customer } from '@types'
import { fetchCustomers } from '@client'
import { usePagination } from '@hooks'
import { toLocalDate } from '@utils/dates'

import {
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
  ChevronDoubleLeft,
  CursorPointer
} from 'mdi-material-ui'

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  createStyles,
  makeStyles,
  Button,
  Typography as T,
  TextField,
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
    actions: {
      padding: theme.spacing(0)
    },
    thLast: {
      width: '160px',
      padding: 0
    },
    button: {
      margin: theme.spacing(0, 0.5)
    },
    text: {
      margin: theme.spacing(0, 1),
      fontSize: theme.typography.fontSize
    }
  })
)

interface Props {
  open: boolean,
  onClose: () => void,
  onSelect: (customer: Customer) => void
}

const customerFilter = (search: string) => (item: Customer) => {
  return item.firstName.includes(search)
    || item.lastName.includes(search)
    || item.email.includes(search)
    || item.age.toString().includes(search)
    || item.created.includes(search)
    || item.id.toString().includes(search)
}

const CustomerDialog = ({
  open,
  onClose,
  onSelect
}: Props) => {
  const classes = useStyles()
  const [search, setSearch] = useState<string>('')
  const { offset, limit, setOffset, filterPagination } = usePagination(15)
  const [customers, setCustomers] = useState<null | Customer[]>(null)

  useEffect(() => {
    if (open) {
      fetchCustomers()
        .then(setCustomers)
    }
    else {
      setCustomers(null)
    }
  }, [open])

  useEffect(() => {
    if (search !== '') {
      setOffset(1)
    }
  }, [search])

  const length = customers === null ? 1 : customers.length
  const maxPages = Math.ceil(length / limit)
  const max = offset * limit
  const min = (max - limit) + 1

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='md'
      aria-labelledby='new-customer-dialog-title'
    >
      <DialogTitle id='new-customer-dialog-title'>Select a customer</DialogTitle>
      {customers === null ? (
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      ) : (
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.th} component='th'>Name</TableCell>
                <TableCell className={classes.th} component='th'>Age</TableCell>
                <TableCell className={classes.th} component='th'>Email</TableCell>
                <TableCell className={classes.th} component='th'>Created</TableCell>
                <TableCell className={classes.thLast} component='th'>
                  <TextField
                    onClick={e => e.stopPropagation()}
                    label='Search'
                    value={search}
                    onChange={e => setSearch(e.currentTarget.value)}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.filter(customerFilter(search))
                .filter(filterPagination(offset, limit))
                .map(customer => (
                  <TableRow
                    key={customer.id}
                    className='contains-inv-actions'
                    hover
                    onClick={() => onSelect(customer)}
                  >
                    <TableCell component='td'>{customer.firstName} {customer.lastName}</TableCell>
                    <TableCell component='td'>{customer.age}</TableCell>
                    <TableCell component='td'>{customer.email}</TableCell>
                    <TableCell component='td'>{toLocalDate(customer.created)}</TableCell>
                    <TableCell component='td' className={classes.actions}>
                      <div className='inv-actions'>
                        <Tooltip title='Select customer' placement='top'>
                          <IconButton
                            className={classes.small}
                            onClick={() => onSelect(customer)}>
                            <CursorPointer />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                )
                )}
            </TableBody>
          </Table>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset <= 1 || search === ''}
          onClick={() => setOffset(1)}
        >
          <ChevronDoubleLeft />
        </Button>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset <= 1 || search === ''}
          onClick={() => setOffset(offset - 1)}
        >
          <ChevronLeft />
        </Button>
        <T
          component='span'
          className={classes.text}
          color='textSecondary'
        >{min}-{max > length ? length : max} of {length}</T>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset >= maxPages || search === ''}
          onClick={() => setOffset(offset + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset >= maxPages || search === ''}
          onClick={() => setOffset(maxPages)}
        >
          <ChevronDoubleRight />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerDialog
