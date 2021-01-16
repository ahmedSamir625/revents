import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/eventFrom/EventForm";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";

function App() {




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
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route path={["/createEvent","/manage/:id"]} component={EventForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
