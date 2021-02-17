import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Segment, Item, Header, Image, Button } from "semantic-ui-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  addUserAttendace,
  cancelEventAttendace,
} from "../../../app/firestore/firestoreService";
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

const EventDetailedHeader = ({ event, isGoing, isHost }) => {
  const [loading, setLoading] = useState(false);

  const handleUserJoinEvent = async () => {
    setLoading(true);
    try {
      await addUserAttendace(event);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLeaveEvent = async () => {
    setLoading(true);
    try {
      await cancelEventAttendace(event);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                <p>
                  Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment clearing attached="bottom">
        {!isHost && (
          <>
            {isGoing ? (
              <Button onClick={handleUserLeaveEvent} loading={loading}>
                Cancel My Place
              </Button>
            ) : (
              <Button
                onClick={handleUserJoinEvent}
                loading={loading}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
