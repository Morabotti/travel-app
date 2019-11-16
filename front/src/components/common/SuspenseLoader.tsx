import React, { FC } from 'react'

import {
  Typography as T,
  makeStyles,
  createStyles,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      height: '450px',
      alignItems: 'flex-end',
      justifyContent: 'center',
      outline: 0
    },
    wrap: {
      textAlign: 'center',
      userSelect: 'none',
      zIndex: 1000,
      color: theme.palette.common.white
    },
    text: {
      color: theme.palette.common.white
    },
    icon: {
      marginBottom: theme.spacing(2)
    },
    static: {
      position: 'static',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px'
    },
    bg: {
      backgroundColor: 'rgba(0, 0, 0, 0.30)',
      animation: 'fadeIn 300ms ease',
      position: 'fixed',
      zIndex: 100,
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    },
    '@global': {
      '@keyframes fadeIn': {
        '0%': {
          opacity: 0
        },
        '100%': {
          opacity: 1
        }
      }
    }
  })
)

const SuspenseLoader: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.static}>
      <div className={classes.bg} />
      <div className={classes.root}>
        <div className={classes.wrap}>
          <CircularProgress className={classes.icon} size={65} color='inherit' />
          <T variant='h3' className={classes.text}>Loading</T>
        </div>
      </div>
    </div>
  )
}

export default SuspenseLoader
