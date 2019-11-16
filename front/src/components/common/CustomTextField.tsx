import React from 'react'
import { TextField } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string
}

const CustomTextField = ({ placeholder, label, ...props }: FieldAttributes<CustomFieldAttr>) => {
  const [field, meta] = useField<CustomFieldAttr>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      {...field}
      className={props.className}
      fullWidth
      label={label}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  )
}

export default CustomTextField
