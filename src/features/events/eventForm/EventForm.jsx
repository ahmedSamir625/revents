import React, { useState } from "react";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";

import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listenToEvents } from "../eventsActions";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput.jsx";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToSingleEventFromFireStore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);

  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id, // !! converts the value to boolean
    query: () => listenToSingleEventFromFireStore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    dependencies: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading Event..." />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (formValues, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(formValues)
              : await addEventToFirestore(formValues);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
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
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                content={
                  selectedEvent.isCancelled ? "Reactivate Event" : "Cancel"
                }
                color={selectedEvent.isCancelled ? "green" : "red"}
                onClick={() => setConfirmOpen(true)}
              />
            )}

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
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? `Are you sure you want to reactivate this event ?`
            : `Are you sure you want to cancel this event ?`
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
