import React from "react";
import { Segment, Item } from "semantic-ui-react";

const EventDetailedSideBar = ({ attendees }) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {`${attendees.length} ${
          attendees.length > 1 ? "people are" : "person is"
        } going`}
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.id}>
              <Item.Image avatar size="tiny" src={attendee.photoURL || '/assets/user.png'} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
};

export default EventDetailedSideBar;
