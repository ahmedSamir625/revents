// import { sampleData } from "../../app/api/sampleData";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./eventsConstants";

const initialState = {
  events: [],
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      };

    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };

    default:
      return state;
  }
}
