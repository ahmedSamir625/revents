import { Form, Formik } from "formik";
import React from "react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UpdateUserProfile } from "../../../app/firestore/firestoreService";

const ProfileForm = ({ profile }) => {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await UpdateUserProfile(values);
          toast.success('Profile updated Successfully')
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="description" placeholder="Description" />
          <Button
            type="submit"
            size="medium"
            positive
            content="Update Profile"
            floated="right"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
