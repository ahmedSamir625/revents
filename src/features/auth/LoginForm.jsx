import { Form, Formik } from "formik";
import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Sign in to Re-vents">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required().min(8),
        })}
        //setSubmitting is a Formik prop that allow us to handle the loading ..
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values); // dy 3l service eli ht5li 3ndy user fl firebase store bta3 l browser f l verifyAuth() ht listen 3l t8yeer da w t2ol ndha 3la signInUser() Action
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: "Invalid email or password." });
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, isSubmitting, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: "10px", width: "100%" }}
                content={errors.auth}
              />
            )}

            <Button
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
              fluid
              color="teal"
              content="Login"
            />
            <Divider horizontal>OR</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
