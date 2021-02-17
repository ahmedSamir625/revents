import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEventsFromFireStore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventsActions";

import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)));
  };

  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventsFromFireStore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    dependencies: [dispatch,predicate],
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
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
