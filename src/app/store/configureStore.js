import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { VerifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.dispatch(VerifyAuth()); // 3mlt kda hena 34an 3yz kol mra l store yt3mlo intialize y listen 3la l auth state bt3t l user f y3rf leh data fl brower wla la
  return store;
}
