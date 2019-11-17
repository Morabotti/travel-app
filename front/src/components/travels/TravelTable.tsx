import React from 'react'
import { Travel } from '@types'
import clsx from 'clsx'
import { PencilOutline, DeleteOutline, CubeOutline } from 'mdi-material-ui'

import {
  makeStyles,
  createStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  IconButton
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    th: {
      lineHeight: 1,
      fontWeight: 600
    },
    small: {
      padding: theme.spacing(1)
    },
    offset: {
      marginRight: theme.spacing(2)
    },
    actions: {
      padding: theme.spacing(0)
    },
    thLast: {
      width: '160px'
    }
  })
)

interface Props {
  travels: Travel[],
  setConfirmDialog: (set: number | null) => void,
  setEditDialog: (set: null | Travel) => void
}

const CustomerTable = ({
  travels,
  setConfirmDialog,
  setEditDialog
}: Props) => {
  const classes = useStyles()
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.th} component='th'>Code</TableCell>
          <TableCell className={classes.th} component='th'>Name</TableCell>
          <TableCell className={classes.th} component='th'>Starting City</TableCell>
          <TableCell className={classes.th} component='th'>Destination City</TableCell>
          <TableCell className={classes.th} component='th'>Type</TableCell>
          <TableCell className={classes.th} component='th'>Guided</TableCell>
          <TableCell className={classes.thLast} component='th' />
        </TableRow>
      </TableHead>
      <TableBody>
        {travels.map(travel => (
          <TableRow key={travel.id} className='contains-inv-actions'>
            <TableCell component='td'>{travel.travelCode}</TableCell>
            <TableCell component='td'>{travel.name}</TableCell>
            <TableCell component='td'>{travel.startingCity}</TableCell>
            <TableCell component='td'>{travel.destinationCity}</TableCell>
            <TableCell component='td'>{travel.travelType}</TableCell>
            <TableCell component='td'>{travel.guidedTour ? 'Yes' : 'No'}</TableCell>
            <TableCell component='td' className={classes.actions}>
              <div className='inv-actions'>
                <Tooltip title='Edit travel' placement='top'>
                  <IconButton
                    className={clsx(classes.small, classes.offset)}
                    onClick={() => setEditDialog(travel)}
                  >
                    <PencilOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete travel' placement='top'>
                  <IconButton
                    className={clsx(classes.small, classes.offset)}
                    onClick={() => setConfirmDialog(travel.id)}>
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title='View travel' placement='top'>
                  <IconButton
                    className={classes.small}
                    onClick={() => {}}
                  >
                    <CubeOutline />
                  </IconButton>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CustomerTable
