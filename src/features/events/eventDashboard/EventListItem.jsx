import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { deleteEvent } from "../eventsActions";
import { useDispatch } from "react-redux";
import EventListAttendee from "./EventListAttendee";
import { format} from 'date-fns'

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: "10px" }}>
      <SegmentGroup>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date,'MMMM d, yyyy h:mm a')}
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
          <div style={{ marginBottom: "10px" }}>{event.description}</div>
          <Button
            onClick={() => dispatch(deleteEvent(event.id))}
            floated="right"
            content="Delete"
            negative
          />

          <Button
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </SegmentGroup>
    </div>
  );
};

export default EventListItem;
