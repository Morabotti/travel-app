import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string,
  options: {
    value: string | number,
    label: string
  }[]
}

const CustomSelect = ({ label, ...props }: FieldAttributes<CustomFieldAttr>) => {
  const [field] = useField<CustomFieldAttr>(props)

  return (
    <FormControl fullWidth className={props.className}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Select
        {...field}
        fullWidth
        labelId='select-label'
      >
        {props.options.map((i, j) => (
          <MenuItem key={j} value={i.value}>{i.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomSelect
