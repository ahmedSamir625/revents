import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css"; // ktbtha fo2 l import bta3 l css bta3y 34an 22dr a override l sctyle bta3 semantic
import "react-toastify/dist/ReactToastify.min.css";
import 'react-calendar/dist/Calendar.css';

import "./app/layout/styles.css";

import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/layout/ScrollToTop";


// ReactDOM.render(
//   // <React.StrictMode>
//     <App />,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

const rootEl = document.getElementById("root");
const store = configureStore();


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>,

    rootEl
  );
}

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", function () {
    setTimeout(render);
  });
}

render();

reportWebVitals();
