import { Link } from "react-router-dom";
import { Menu } from "antd";

export default function MenuLink({ to, children, ...rest }) {
  return (
    <Menu.Item key={to} {...rest}>
      <Link to={to}>{children}</Link>
    </Menu.Item>
  );
}
