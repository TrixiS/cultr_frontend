import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserMenu = ({ authState, ...rest }) => {
  return (
    <Menu.SubMenu
      icon={<UserOutlined />}
      title={authState.user?.username}
      {...rest}
    >
      <Menu.Item key="profile">
        <Link to="profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" danger>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu.SubMenu>
  );
};

export default function LoginControl(props) {
  const authState = useContext(AuthContext);

  return authState.user === null ? (
    <Menu.Item {...props}>
      <Link to="/login">Login</Link>
    </Menu.Item>
  ) : (
    <UserMenu authState={authState} {...props} />
  );
}
