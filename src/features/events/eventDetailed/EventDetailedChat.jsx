import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Header, Comment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/firestore/firebaseService";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { listenToEventChat } from "../eventsActions";

import { Link } from "react-router-dom";
import { formatDistance } from "date-fns/esm";
import { CLEAR_COMMENTS } from "../eventsConstants";
import { createDataTree } from "../../../app/common/util/util";

const EventDetailedChat = ({ eventId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);

  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  const handleCloseReplyForm = () => {
    setShowReplyForm({ open: false, commentId: null });
  };

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });

    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getEventChatRef().off(); // aflt l listener 34an myfdlsh y listen 3l comments b3d m unmout l component
    };
  }, [dispatch, eventId]);

  createDataTree(comments);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} parentId={0} closeForm={setShowReplyForm}/>

        <Comment.Group >
          {createDataTree(comments).map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split("\n").map((textLine, i) => (
                    <span key={i}>
                      {textLine} <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm && showReplyForm.commentId === comment.id && (
                    <EventDetailedChatForm
                      eventId={eventId}
                      parentId={comment.id}
                      closeForm={handleCloseReplyForm}
                    />
                  )}
                </Comment.Actions>
              </Comment.Content>

              {comment.childNodes.length > 0 && (
                <Comment.Group >
                  {comment.childNodes.reverse().map((child) => (
                    <Comment key={child.id}  >
                      <Comment.Avatar  style={{height:'30px' , width:'30px'}}
                        src={child.photoURL || "/assets/user.png"}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text >
                          {child.text.split("\n").map((textLine, i) => (
                            <span key={i}>
                              {textLine} <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: child.id,
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm &&
                            showReplyForm.commentId === child.id && (
                              <EventDetailedChatForm
                                eventId={eventId}
                                parentId={child.parentId}
                                closeForm={handleCloseReplyForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
