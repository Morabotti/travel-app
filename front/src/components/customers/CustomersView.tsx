import React, { FC } from 'react'
import { Section, ActionButton } from '@components/common'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { useCustomers } from '@hooks'
import { CustomerTable, NewCustomerDialog } from '.'
import { IconButton } from '@material-ui/core'

const CustomersView: FC = () => {
  const {
    customers,
    loading,
    onNewCustomer,
    isNewCustomerDialog,
    setNewCustomerDialog
  } = useCustomers()

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
      <ActionButton
        title='Add new customer'
        onClick={() => setNewCustomerDialog(true)}
      />
      <NewCustomerDialog
        open={isNewCustomerDialog}
        onSubmit={onNewCustomer}
        onClose={() => setNewCustomerDialog(false)}
      />
    </div>
  )
}

export default CustomersView
