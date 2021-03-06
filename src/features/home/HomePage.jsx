import React from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesParams from "./particlesParams.js";

const HomePage = ({ history }) => {
  //" history " is a property from the browser that allow to push or pop any components

  return (
    <>
      <Particles className="particles" params={particlesParams} />

      <Segment
        //   inverted
        className="masthead main-background"
        textAlign="center"
        vertical
      >
        <Container>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo.png"
              style={{ marginBottom: 12 }}
            />
            Revents
          </Header>

          <Button size="huge" inverted onClick={() => history.push("/events")} >
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Container>
      </Segment>
    </>
  );
};

export default HomePage;
