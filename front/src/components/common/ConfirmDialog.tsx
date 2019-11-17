import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@material-ui/core'

interface Props {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string
}

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  description,
  title
}: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth='sm'
    aria-labelledby='confirm-dialog-title'
    aria-describedby='confirm-dialog-description'
  >
    <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id='confirm-dialog-description'>
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color='secondary'>
        Close
      </Button>
      <Button onClick={onConfirm} color='primary' autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDialog
