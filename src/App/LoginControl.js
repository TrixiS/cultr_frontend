import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";

// TODO: use MenuLink here
function UserMenu({ authState, ...rest }) {
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
        <Link to="/logout">Log out</Link>
      </Menu.Item>
    </Menu.SubMenu>
  );
}

export default function LoginControl(props) {
  const authState = useContext(AuthContext);

  return authState.user === null ? (
    <Menu.Item {...props}>
      <Link to="/login">Log in</Link>
    </Menu.Item>
  ) : (
    <UserMenu authState={authState} {...props} />
  );
}
