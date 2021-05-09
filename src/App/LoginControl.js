import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import MenuLink from "./MenuLink";

function UserMenu({ authState, ...rest }) {
  return (
    <Menu.SubMenu
      icon={<UserOutlined />}
      title={authState.user?.username}
      {...rest}
    >
      <MenuLink to="/profile">Profile</MenuLink>
      <MenuLink to="/logout" danger>
        Log out
      </MenuLink>
    </Menu.SubMenu>
  );
}

export default function LoginControl(props) {
  const authState = useContext(AuthContext);

  return authState.user === null ? (
    <MenuLink to="/login" {...props}>
      Log in
    </MenuLink>
  ) : (
    <UserMenu authState={authState} {...props} />
  );
}
