import React from "react";
import {
  Button,
  Icon,
  Item,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";

import EventListAttendee from "./EventListAttendee";

const EventListItem = ({ event }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <SegmentGroup>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content="Event Header" />
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date}
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal size="small">
            {event.attendees.map((attendee) => (
              <EventListAttendee attendee={attendee} key={attendee.id} />
            ))}
          </List>
        </Segment>

        <Segment clearing>
          <div>{event.description}</div>
          <Button color="teal" floated="right" content="View" />
        </Segment>
      </SegmentGroup>
    </div>
  );
};

export default EventListItem;
