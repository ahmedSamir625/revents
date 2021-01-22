import { useField } from "formik";
import React from "react";
import { FormField, Label, Select } from "semantic-ui-react";

const MySelectInput = ({ label, ...props }) => {
  //l helper dy eli hst5dm mnha "setValue & setTouched"
  const [field, meta, helper] = useField(props);

  
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>

      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => helper.setValue(d.value)}
        onBlur={() => helper.setTouched(true)}
        {...props}
      />

      {meta.touched && meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default MySelectInput;
