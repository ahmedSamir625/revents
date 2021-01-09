import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

const Nav = ({setFormOpen}) => {
  return (
    <Menu inverted fixed='top' >
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>

        <Menu.Item name="Events" />

        <Menu.Item>
          <Button onClick={()=>{setFormOpen(true)}} content="Create Event" positive />
        </Menu.Item>

        <Menu.Item position="right">
          <Button content="Login" basic inverted />
          <Button
            content="Register"
            basic
            inverted
            style={{ marginLeft: 10 }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Nav;
