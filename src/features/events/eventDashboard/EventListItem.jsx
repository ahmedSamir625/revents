import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { format } from "date-fns";
import { deleteEventFromFirestore } from "../../../app/firestore/firestoreService";

const EventListItem = ({ event }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <SegmentGroup>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image as={Link} to={`/profile/${event.hostUid}`} size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></Item.Description>
                {event.isCancelled && (
                  <Label
                    content="Cancelled"
                    ribbon="right"
                    color="red"
                    style={{ top: "-40px" }}
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
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
            onClick={() => deleteEventFromFirestore(event.id)}
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
