import React, { FC } from 'react'
import { Section, ActionButton, ConfirmDialog } from '@components/common'
import { useCustomers } from '@hooks'
import { CustomerTable, NewCustomerDialog, EditCustomerDialog } from '.'

const CustomersView: FC = () => {
  const {
    customers,
    editCustomer,
    loading,
    onNewCustomer,
    onEditCustomer,
    onConfirmDelete,
    isNewCustomerDialog,
    isConfirmDialog,
    setConfirmDialog,
    setNewCustomerDialog,
    setEditCustomerDialog
  } = useCustomers()

  return (
    <div>
      <Section title='Customers' loading={loading}>
        <CustomerTable
          customers={customers}
          setConfirmDialog={setConfirmDialog}
          setEditDialog={setEditCustomerDialog}
        />
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
      <EditCustomerDialog
        open={editCustomer !== null}
        initialValues={editCustomer}
        onSubmit={onEditCustomer}
        onClose={() => setEditCustomerDialog(null)}
      />
      <ConfirmDialog
        open={isConfirmDialog !== null}
        onConfirm={onConfirmDelete}
        onClose={() => setConfirmDialog(null)}
        title='Confirmation'
        description={`Are you sure that you want to delete this customer.
          This action will permanently delete customers orders too.
        `}
      />
    </div>
  )
}

export default CustomersView
