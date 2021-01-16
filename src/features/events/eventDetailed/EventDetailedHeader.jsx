import React from "react";
import { Link } from "react-router-dom";

import { Segment, Item, Header, Image, Button, Grid } from "semantic-ui-react";

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

const EventDetailedHeader = () => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/drinks.jpg`}
          fluid
          style={styles.eventImageStyle}
        />

        <Segment basic style={styles.eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "white" }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bob</strong>
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
            <Button as={Link} to={`/manage/1`} color="orange" floated="right">
              Manage Event
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
