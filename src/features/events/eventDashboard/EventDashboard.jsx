import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventList from "./EventList";

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  // const handleCreateEvent = (newEvent) => {
  //   setEvents([...events, newEvent]);
  // };

  // const handleUpdateEvent = (updatedEvent) => {
  //   setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  // };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
      
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
