import React, { Fragment } from 'react'
import { Travel } from '@types'

import {
  createStyles,
  makeStyles,
  Grid,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    key: {
      fontWeight: 600
    },
    error: {
      color: theme.palette.error.main
    }
  })
)

interface Props {
  travel: Travel | null,
  error: boolean
}

const CustomerDetails = ({
  travel,
  error
}: Props) => {
  const classes = useStyles()

  if (!travel) {
    return <Fragment />
  }

  if (error) {
    return (
      <div>
        <T variant='subtitle1' className={classes.error}>Failed to load travel details!</T>
      </div>
    )
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <T className={classes.key}>ID</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.id}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Travel code</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.travelCode}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Name</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.name}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Description</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.description}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Starting city</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.startingCity}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Destination city</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.destinationCity}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Guided</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.guidedTour ? 'Yes' : 'No'}</T>
        </Grid>
        {travel.guidedTour && travel.guide !== null && (
          <>
            <Grid item xs={2}>
              <T className={classes.key}>Guide name</T>
            </Grid>
            <Grid item xs={10}>
              <T>{travel.guide}</T>
            </Grid>
          </>
        )}
        <Grid item xs={2}>
          <T className={classes.key}>Cost</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.cost}</T>
        </Grid>
        <Grid item xs={2}>
          <T className={classes.key}>Travel type</T>
        </Grid>
        <Grid item xs={10}>
          <T>{travel.travelType}</T>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerDetails
