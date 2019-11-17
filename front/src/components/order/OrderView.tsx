import React, { FC } from 'react'
import { BackButton, Section } from '@components/common'
import { useHistory } from 'react-router'
import { useOrder } from '@hooks'
import { OrderDetails } from '.'

const CustomerView: FC = () => {
  const { push } = useHistory()
  const { order, loading, error } = useOrder()

  return (
    <div>
      <Section title='Order details' loading={loading}>
        <OrderDetails
          order={order}
          error={error}
        />
      </Section>
      <BackButton
        title='Back to orders'
        onClick={() => push('/orders')}
      />
    </div>
  )
}

export default CustomerView
