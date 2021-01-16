import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory(); // dy bt5leni 22dr ast5dm history lel compnents eli msh m7tota f route

  const handleSignOut = () => {
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link}  to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>

        <Menu.Item as={NavLink} to="/events" name="Events" />

        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button content="Create Event" positive />
          </Menu.Item>
        )}

        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
