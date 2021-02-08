import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Dropdown, Menu, Image } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

const SignedInMenu = () => {
  // const history = useHistory(); // dy bt5leni 22dr ast5dm history lel compnents eli msh m7tota f route
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Menu.Item position="right">
      <Image avatar spaced src={currentUser.photoURL} />

      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="./createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/account"
            text="My Account"
            icon="settings"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
