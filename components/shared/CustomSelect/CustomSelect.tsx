import * as React from 'react';
import { Select, MenuItem } from '@material-ui/core';

export interface IOption {
  label: string;
  value: string | number;
}

interface IProps {
  field: any;
  form: IForm;
  options: IOption[];
}

interface IForm {
  touched: any;
  errors: any;
}
const customSelect = ({ field, form, options, ...props }: IProps) => (
  <Select
    error={Boolean(form.touched[field.name] && form.errors[field.name])}
    helpertext={
      form.errors[field.name] &&
      form.touched[field.name] &&
      String(form.errors[field.name])
    }
    {...field}
    {...props}>
    {options.map((option, index) => {
      return (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      );
    })}
  </Select>
);

export default customSelect;
