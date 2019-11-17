import React from 'react'
import { TextField } from '@material-ui/core'

interface Props {
  children: JSX.Element,
  label: string,
  value: string,
  onClick: () => void,
  fullWidth?: boolean,
  className: any, // eslint-disable-line
  error?: string
}

const DialogButton = ({
  children,
  label,
  value,
  onClick,
  fullWidth,
  className,
  error
}: Props) => {
  return (
    <>
      <TextField
        className={className}
        label={label}
        value={value}
        onClick={onClick}
        helperText={error}
        error={!!error}
        fullWidth={fullWidth}
      />
      {children}
    </>
  )
}

export default DialogButton
