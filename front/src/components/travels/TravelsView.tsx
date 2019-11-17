import React, { FC } from 'react'
import { Section, ActionButton, ConfirmDialog } from '@components/common'
import { useTravels } from '@hooks'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { TravelTable, NewTravelDialog, EditTravelDialog } from '.'
import { IconButton } from '@material-ui/core'

const TravelsView: FC = () => {
  const {
    travels,
    loading,
    editTravel,
    setNewTravelDialog,
    setConfirmDialog,
    setEditTravelDialog,
    isNewTravelDialog,
    isConfirmDialog,
    onConfirmDelete,
    onNewTravel,
    onEditTravel
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
        <TravelTable
          travels={travels}
          setConfirmDialog={setConfirmDialog}
          setEditDialog={setEditTravelDialog}
        />
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
      <ConfirmDialog
        open={isConfirmDialog !== null}
        onConfirm={onConfirmDelete}
        onClose={() => setConfirmDialog(null)}
        title='Confirmation'
        description={`Are you sure that you want to delete this travel.
          This action will permanently delete orders with this travel.
        `}
      />
      <EditTravelDialog
        open={editTravel !== null}
        initialValues={editTravel}
        onSubmit={onEditTravel}
        onClose={() => setEditTravelDialog(null)}
      />
    </div>
  )
}

export default TravelsView
