import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToSingleEventFromFireStore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventsActions";
import LoadingCompnent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";

const EventDetailedPage = ({ match }) => {
  const event = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id)
  );

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToSingleEventFromFireStore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    dependencies: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingCompnent content="Loading Event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
