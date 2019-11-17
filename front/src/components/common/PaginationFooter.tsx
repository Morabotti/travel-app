import React from 'react'

import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight
} from 'mdi-material-ui'

import {
  createStyles,
  makeStyles,
  Button,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    footer: {
      margin: theme.spacing(1.5, 0, 0.5),
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      margin: theme.spacing(0, 0.5)
    },
    text: {
      margin: theme.spacing(0, 1),
      fontSize: theme.typography.fontSize
    }
  })
)

interface Props {
  setOffset: (set: number) => void,
  offset: number,
  limit: number,
  length: number
}

const PaginationFooter = ({
  setOffset,
  offset,
  limit,
  length
}: Props) => {
  const classes = useStyles()
  const maxPages = Math.ceil(length / limit)
  const max = offset * limit
  const min = (max - limit) + 1

  return (
    <div className={classes.footer}>
      <div>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset <= 1}
          onClick={() => setOffset(1)}
        >
          <ChevronDoubleLeft />
        </Button>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset <= 1}
          onClick={() => setOffset(offset - 1)}
        >
          <ChevronLeft />
        </Button>
        <T
          component='span'
          className={classes.text}
          color='textSecondary'
        >{min}-{max > length ? length : max} of {length}</T>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset >= maxPages}
          onClick={() => setOffset(offset + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          size='large'
          variant='outlined'
          className={classes.button}
          disabled={offset >= maxPages}
          onClick={() => setOffset(maxPages)}
        >
          <ChevronDoubleRight />
        </Button>
      </div>
    </div>
  )
}

export default PaginationFooter
