import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string
}

const CustomCheckBox = ({ label, ...props }: FieldAttributes<CustomFieldAttr>) => {
  const [field] = useField<CustomFieldAttr>(props)

  return (
    <FormControlLabel
      {...field}
      className={props.className}
      control={<Checkbox color='primary' />}
      label={label}
    />
  )
}

export default CustomCheckBox
