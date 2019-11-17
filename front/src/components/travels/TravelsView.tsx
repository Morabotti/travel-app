import React, { FC } from 'react'
import { Section, ActionButton } from '@components/common'
import { useTravels } from '@hooks'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { TravelTable, NewTravelDialog } from '.'
import { IconButton } from '@material-ui/core'

const TravelsView: FC = () => {
  const {
    travels,
    loading,
    setNewTravelDialog,
    isNewTravelDialog,
    onNewTravel
  } = useTravels()

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
      <ActionButton
        title='Add new travel'
        onClick={() => setNewTravelDialog(true)}
      />
      <NewTravelDialog
        open={isNewTravelDialog}
        onSubmit={onNewTravel}
        onClose={() => setNewTravelDialog(false)}
      />
    </div>
  )
}

export default TravelsView
