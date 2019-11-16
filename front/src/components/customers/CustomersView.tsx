import React, { FC } from 'react'
import { Section, ActionButton } from '@components/common'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { useCustomers } from '@hooks'
import { CustomerTable } from '.'

import {
  makeStyles,
  createStyles,
  IconButton
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    action: {
      position: 'fixed',
      bottom: '0',
      right: '0',
      margin: theme.spacing(3.5)
    }
  })
)

const CustomersView: FC = () => {
  const classes = useStyles()
  const { customers, loading, error } = useCustomers()

  return (
    <div>
      <Section
        title='Customers'
        loading={loading}
        actions={
          <>
            <IconButton onClick={() => {}}>
              <BookmarkMultipleOutline />
            </IconButton>
          </>
        }
      >
        <CustomerTable customers={customers} />
      </Section>
      <ActionButton title='Add new customer' onClick={() => {}} />
    </div>
  )
}

export default CustomersView
