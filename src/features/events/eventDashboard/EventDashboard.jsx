import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import {

  listenToEventsFromFireStore,
} from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventsActions";

import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  const dispatch = useDispatch();


  useFirestoreCollection({
    query: () => listenToEventsFromFireStore(),
    data: (events) => dispatch(listenToEvents(events)),
    dependencies: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6} style={{ minWidth: "250px" }}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
