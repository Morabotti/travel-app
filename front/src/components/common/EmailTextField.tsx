import React from 'react'
import { TextField, InputAdornment, CircularProgress } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string,
  loading: boolean,
  isValid: boolean | null
}

const EmailTextField = ({ placeholder, label, ...props }: FieldAttributes<CustomFieldAttr>) => {
  const [field, meta] = useField<CustomFieldAttr>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      {...field}
      className={props.className}
      fullWidth
      label={label}
      placeholder={placeholder}
      helperText={props.isValid === null
        ? errorText
        : props.isValid === false
          ? 'Email is already taken'
          : ''
      }
      error={!!errorText || props.isValid === false}
      InputProps={{
        endAdornment: props.loading
          ? <InputAdornment position='end'>
            <CircularProgress size={20} />
          </InputAdornment>
          : undefined
      }}
    />
  )
}

export default EmailTextField
