import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Layout, Menu, Typography } from "antd";
import { LoginControl } from "../components";

import "./css/Header.css";

function MenuLink({ to, children, ...rest }) {
  return (
    <Menu.Item key={to} {...rest}>
      <Link to={to}>{children}</Link>
    </Menu.Item>
  );
}

export default function Header() {
  const authState = useContext(AuthContext);

  // TODO: use MenuLink in LoginControl
  // TODO: move login control into App dir
  // TODO: move Loading into content file
  return (
    <Layout.Header>
      <Menu theme="dark" mode="horizontal">
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/urls" hidden={authState.user === null}>
          Urls
        </MenuLink>
        <LoginControl className="auth-button" key="login" />
      </Menu>
    </Layout.Header>
  );
}
