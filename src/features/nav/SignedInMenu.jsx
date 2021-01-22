import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Dropdown, Menu, Image } from "semantic-ui-react";
import { signOutUser } from "../auth/authActions";

const SignedInMenu = () => {
  const dispatch = useDispatch();
  // const history = useHistory(); // dy bt5leni 22dr ast5dm history lel compnents eli msh m7tota f route
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Menu.Item position="right">
      <Image avatar spaced src={currentUser.photoURL || "/assets/user.png"} />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="./createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            onClick={() => {
              dispatch(signOutUser());
              history.push("/");
            }}
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
