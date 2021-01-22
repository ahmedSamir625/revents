import React from "react";
import { Link } from "react-router-dom";

import { Segment, Item, Header, Image, Button, Grid } from "semantic-ui-react";
import { format } from 'date-fns'
const styles = {
  eventImageStyle: {
    filter: "brightness(30%)",
  },

  eventImageTextStyle: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  },
};

const EventDetailedHeader = ({event}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={styles.eventImageStyle}
        />

        <Segment basic style={styles.eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(event.date,'MMMM d, yyyy h:mm a')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy }</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment
        clearing
        attached="bottom"
        // style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>
        <Button as={Link} to={`/manage/1`} color="orange" floated="right">
          Manage Event
        </Button> */}
        <Grid>
          <Grid.Column width={10}>
            <Button>Cancel My Place</Button>
            <Button color="teal">JOIN THIS EVENT</Button>
          </Grid.Column>

          <Grid.Column width={6}>
            <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
              Manage Event
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
