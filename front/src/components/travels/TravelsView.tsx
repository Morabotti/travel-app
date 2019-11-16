import React, { FC } from 'react'
import { Section, ActionButton } from '@components/common'
import { useTravels } from '@hooks'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { TravelTable } from '.'
import { IconButton } from '@material-ui/core'

const TravelsView: FC = () => {
  const { travels, loading } = useTravels()

  return (
    <div>
      <Section
        title='Travels'
        loading={loading}
        actions={
          <>
            <IconButton onClick={() => {}}>
              <BookmarkMultipleOutline />
            </IconButton>
          </>
        }
      >
        <TravelTable travels={travels} />
      </Section>
      <ActionButton title='Add new travel' onClick={() => {}} />
    </div>
  )
}

export default TravelsView
