import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Layout, Menu } from "antd";
import LoginControl from "./LoginControl";
import MenuLink from "./MenuLink";

import "./css/Header.css";

export default function Header() {
  const authState = useContext(AuthContext);

  return (
    <Layout.Header>
      <Menu theme="dark" mode="horizontal">
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/urls" hidden={authState.user === null}>
          Urls
        </MenuLink>
        <LoginControl className="auth-button" />
      </Menu>
    </Layout.Header>
  );
}
