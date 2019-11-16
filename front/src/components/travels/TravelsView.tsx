import React, { FC } from 'react'
import { Section, ActionButton } from '@components/common'
import { useTravels } from '@hooks'
import { BookmarkMultipleOutline } from 'mdi-material-ui'
import { TravelTable } from '.'

import {
  createStyles,
  makeStyles,
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

const TravelsView: FC = () => {
  const classes = useStyles()
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
