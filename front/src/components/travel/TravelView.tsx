import React, { FC } from 'react'
import { BackButton, Section } from '@components/common'
import { useHistory } from 'react-router'
import { useTravel } from '@hooks'
import { TravelDetails, TravelOrders } from '.'

const CustomerView: FC = () => {
  const { push } = useHistory()
  const { travel, travelRequest, orderRequest } = useTravel()

  return (
    <div>
      <Section title='Travel details' loading={travelRequest.loading}>
        <TravelDetails
          travel={travel}
          error={travelRequest.error}
        />
      </Section>
      {!travelRequest.loading && (
        <Section title='Travel orders' loading={orderRequest.loading}>
          <TravelOrders
            error={orderRequest.error}
            orders={[]}
          />
        </Section>
      )}
      <BackButton
        title='Back to travels'
        onClick={() => push('/travels')}
      />
    </div>
  )
}

export default CustomerView
