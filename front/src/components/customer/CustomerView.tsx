import React, { FC } from 'react'
import { BackButton, Section } from '@components/common'
import { useHistory } from 'react-router'
import { useCustomer } from '@hooks'
import { CustomerDetails, CustomerOrders } from '.'

const CustomerView: FC = () => {
  const { push } = useHistory()
  const { customer, customerRequest, orderRequest } = useCustomer()

  return (
    <div>
      <Section title='Customer details' loading={customerRequest.loading}>
        <CustomerDetails
          customer={customer}
          error={customerRequest.error}
        />
      </Section>
      {!customerRequest.loading && (
        <Section title='Customer orders' loading={orderRequest.loading}>
          <CustomerOrders
            error={orderRequest.error}
            orders={[]}
          />
        </Section>
      )}
      <BackButton
        title='Back to customers'
        onClick={() => push('/customers')}
      />
    </div>
  )
}

export default CustomerView
