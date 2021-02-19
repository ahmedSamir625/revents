import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

import { Loader } from "semantic-ui-react";
import { addEventChatComment } from "../../../app/firestore/firebaseService";

const EventDetailedChatForm = ({ eventId, parentId, closeForm}) => {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm({open:false , parentId:null})
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="ui form">
          <Field name="comment">
            {({ field }) => (
              <div style={{ position: "relative" }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows={2}
                  {...field}
                  placeholder="Enter your comment (Enter to submit, Shift + Enter for new line)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.shiftKey) return;
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      if (/\S/.test(e.target.value)) handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>

          {/* <Button
            loading={isSubmitting}
            content="Add Reply"
            icon="comment"
            primary
            type="submit"
          /> */}
        </Form>
      )}
    </Formik>
  );
};

export default EventDetailedChatForm;
