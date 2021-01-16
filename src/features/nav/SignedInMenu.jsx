import React from "react";
import { Link } from "react-router-dom";

import { Dropdown, Menu, Image } from "semantic-ui-react";

const SignedInMenu = ({ signOut }) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced src="/assets/user.png" />
      <Dropdown pointing="top left" text="Ahmed">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="./createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            onClick={signOut}
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
