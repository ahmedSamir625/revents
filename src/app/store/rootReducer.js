import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import eventReducer from "../../features/events/eventsReducers";
import profileReducer from "../../features/profiles/profilePage/profileReducer";
import testReducer from "../../features/sandBox/testReducer";
import asyncReducer from "../async/asyncReducer";

import modalReducer from "../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer,
});

export default rootReducer;
