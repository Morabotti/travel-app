import React from 'react'
import { Travel } from '@types'

import {
  makeStyles,
  createStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    th: {
      lineHeight: 1
    }
  })
)

interface Props {
  travels: Travel[]
}

const CustomerTable = ({
  travels
}: Props) => {
  const classes = useStyles()
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.th} component='th'>Code</TableCell>
          <TableCell className={classes.th} component='th'>Description</TableCell>
          <TableCell className={classes.th} component='th'>Starting City</TableCell>
          <TableCell className={classes.th} component='th'>Destination City</TableCell>
          <TableCell className={classes.th} component='th'>Guided</TableCell>
          <TableCell className={classes.th} component='th' />
        </TableRow>
      </TableHead>
      <TableBody>
        {travels.map(travel => (
          <TableRow key={travel.id}>
            <TableCell component='td'>{travel.travelCode}</TableCell>
            <TableCell component='td'>{travel.description}</TableCell>
            <TableCell component='td'>{travel.startingCity}</TableCell>
            <TableCell component='td'>{travel.destinationCity}</TableCell>
            <TableCell component='td'>{travel.guidedTour ? 'Yes' : 'No'}</TableCell>
            <TableCell component='td' />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CustomerTable
