import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Button } from "semantic-ui-react";

const ErrorComponent = () => {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Oops! We have an error."}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: "20px" }}
        content="Return to Events page"
      />
    </Segment>
  );
};

export default ErrorComponent;
