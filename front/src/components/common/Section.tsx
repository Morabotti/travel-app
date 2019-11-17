import React from 'react'

import {
  makeStyles,
  createStyles,
  Typography as T,
  Paper,
  LinearProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    section: {
      margin: theme.spacing(1, 0, 0.5),
      display: 'flex',
      justifyContent: 'space-between'
    },
    paper: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3)
    },
    header: {
      ...theme.typography.h4
    }
  })
)

interface Props {
  children?: JSX.Element | JSX.Element[],
  actions?: JSX.Element | JSX.Element[],
  loading?: boolean,
  title: string
}

export default ({
  children,
  title,
  actions,
  loading = false
}: Props) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.section}>
        <T variant='h2' className={classes.header}>{title}</T>
        {actions && !loading && (
          <div>
            {actions}
          </div>
        )}
      </div>
      {loading ? (
        <LinearProgress />
      ) : (
        <Paper elevation={1} className={classes.paper}>
          {children}
        </Paper>
      )}
    </>
  )
}
