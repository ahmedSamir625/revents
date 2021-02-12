import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Dropdown, Menu, Image } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

const SignedInMenu = () => {
  // const history = useHistory(); // dy bt5leni 22dr ast5dm history lel compnents eli msh m7tota f route
  const history = useHistory();

  const { currentUserProfile } = useSelector((state) => state.profile);

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
      <Image
        avatar
        spaced
        src={
          currentUserProfile.photoURL
            ? currentUserProfile.photoURL
            : "/assets/user.png"
        }
      />

      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="./createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile.id}`}
            text="My Profile"
            icon="user"
          />
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
