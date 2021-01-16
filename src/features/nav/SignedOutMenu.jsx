import React from "react";

import { Button, Menu } from "semantic-ui-react";

const SignedOutMenu = ({ setAuthenticated }) => {
  return (
    <Menu.Item position="right">
      <Button
        onClick={() => setAuthenticated(true)}
        content="Login"
        basic
        inverted
      />
      <Button content="Register" basic inverted style={{ marginLeft: 10 }} />
    </Menu.Item>
  );
};

export default SignedOutMenu;
