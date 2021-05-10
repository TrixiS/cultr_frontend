import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Layout, Menu, Typography } from "antd";
import LoginControl from "./LoginControl";
import MenuLink from "./MenuLink";

import "./css/Header.css";

export default function Header() {
  const authState = useContext(AuthContext);

  return (
    <Layout.Header>
      <Menu
        className="unselectable"
        theme="dark"
        mode="horizontal"
        selectable={false}
      >
        <MenuLink to="/">
          <Typography.Text style={{ float: "left", color: "white" }} strong>
            CULTR
          </Typography.Text>
        </MenuLink>
        <MenuLink to="/urls" hidden={authState.user === null}>
          Urls
        </MenuLink>
        <LoginControl className="auth-button" />
      </Menu>
    </Layout.Header>
  );
}
