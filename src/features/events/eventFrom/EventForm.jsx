import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateEvent, createEvent } from "../eventsActions";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput.jsx";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),

    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  const selectedEvent = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValues) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...formValues }))
            : dispatch(
                createEvent({
                  ...formValues,
                  id: cuid(),
                  hostedBy: "AboSamra",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        {/*  edeto classname ="ui form" 34an ast5dm l ui bta3 semantic gowa l form bta3 formiK */}
        {/* lw est5dmt l Form bta3 Formik 3la tol msh h7tag a3ml render wla h7tag ab3t l props bt3t formik lel form */}

        {/* eli t7t dol props mn l Formic w bb3tha lel Form 34an ast5dmha */}
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="ui form">
            <Header sub content="Event Details" color="teal" />
            <MyTextInput name="title" placeholder="Event Title" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <Header sub content="Location Details" color="teal" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm a"
              showTimeSelect
              timeCaption="time"
            />

            <Button
              type="submit"
              floated="right"
              content="submit"
              positive
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
