import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css"; // ktbtha fo2 l import bta3 l css bta3y 34an 22dr a override l sctyle bta3 semantic
import "./app/layout/styles.css";

import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   // <React.StrictMode>
//     <App />,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

const rootEl = document.getElementById("root");

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,

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
