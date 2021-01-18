import { combineReducers } from "redux";
import eventReducer from "../../features/events/eventsReducers";
import testReducer from "../../features/sandBox/testReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
});

export default rootReducer;
