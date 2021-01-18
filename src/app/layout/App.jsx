import React from "react";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/eventFrom/EventForm";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import Sandbox from "../../features/sandBox/Sandbox";

function App() {
  const {key} = useLocation();

  return (
    <>
      {/* L compnents bs eli m7tota f route hya eli byb2a leha "history" property */}
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key }
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
