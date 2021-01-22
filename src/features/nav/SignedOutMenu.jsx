import React from "react";
import { useDispatch } from "react-redux";

import { Button, Menu } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

const SignedOutMenu = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Button
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
        content="Login"
        basic
        inverted
      />
      <Button content="Register" basic inverted style={{ marginLeft: 10 }} />
    </Menu.Item>
  );
};

export default SignedOutMenu;
