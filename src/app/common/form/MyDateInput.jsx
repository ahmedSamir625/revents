import { useField, useFormikContext } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";

import DateTimePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { setFieldValue } = useFormikContext();



  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DateTimePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default MyDateInput;
