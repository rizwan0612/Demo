import * as React from 'react';
import { FormControl, FormText } from 'react-bootstrap';

interface IProps {
  field: any;
  form: IForm;
}

interface IForm {
  touched: any;
  errors: any;
}
const customInput = ({
  field,
  form: { touched, errors },
  ...props
}: IProps) => (
  <>
    <FormControl
      isInvalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <FormText>{errors[field.name]}</FormText>
    )}
  </>
);

export default customInput;
