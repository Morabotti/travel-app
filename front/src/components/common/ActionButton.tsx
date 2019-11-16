import React from 'react'
import { Plus } from 'mdi-material-ui'

import {
  createStyles,
  makeStyles,
  Tooltip,
  Fab
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

interface Props {
  title?: string,
  onClick: () => void
}

export default ({
  title,
  onClick
}: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.action}>
      <Tooltip title={title}>
        <Fab
          color='secondary'
          onClick={onClick}
        >
          <Plus />
        </Fab>
      </Tooltip>
    </div>
  )
}
