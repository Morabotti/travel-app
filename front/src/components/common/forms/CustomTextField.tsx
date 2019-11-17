import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string,
  multiline?: boolean,
  startAdornment?: string
}

const CustomTextField = ({ placeholder, startAdornment, label, ...props }: FieldAttributes<CustomFieldAttr>) => {
  const [field, meta] = useField<CustomFieldAttr>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      {...field}
      className={props.className}
      fullWidth
      label={label}
      multiline={props.multiline}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      InputProps={startAdornment ? {
        startAdornment: <InputAdornment position='start'>{startAdornment}</InputAdornment>
      } : undefined}
    />
  )
}

export default CustomTextField
