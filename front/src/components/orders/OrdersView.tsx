import React, { FC } from 'react'
import { Section, ActionButton, ConfirmDialog } from '@components/common'
import { OrderTable, NewOrderDialog, EditOrderDialog } from '.'
import { useOrders } from '@hooks'

const OrdersView: FC = () => {
  const {
    orders,
    loading,
    editOrder,
    isConfirmDialog,
    isNewOrderDialog,
    onConfirmDelete,
    onNewOrder,
    onEditOrder,
    setConfirmDialog,
    setNewOrderDialog,
    setEditOrderDialog
  } = useOrders()

  return (
    <div>
      <Section title='Orders' loading={loading}>
        <OrderTable
          orders={orders}
          setConfirmDialog={setConfirmDialog}
          setEditDialog={setEditOrderDialog}
        />
      </Section>
      <ActionButton
        title='Add new order'
        onClick={() => setNewOrderDialog(true)}
      />
      <NewOrderDialog
        open={isNewOrderDialog}
        onSubmit={onNewOrder}
        onClose={() => setNewOrderDialog(false)}
      />
      <EditOrderDialog
        open={editOrder !== null}
        onClose={() => setEditOrderDialog(null)}
        onSubmit={onEditOrder}
        initialValues={editOrder}
      />
      <ConfirmDialog
        open={isConfirmDialog !== null}
        onConfirm={onConfirmDelete}
        onClose={() => setConfirmDialog(null)}
        title='Confirmation'
        description={`Are you sure that you want to delete this order?`}
      />
    </div>
  )
}

export default OrdersView
