import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { fetchSampleData } from "../../app/api/mockAPI";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  UPDATE_EVENT,
} from "./eventsConstants";

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function listenToEvents(events) {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
}

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
}

export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}
