import { useField } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);



  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default MyTextArea;
