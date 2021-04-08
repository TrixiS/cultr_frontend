import React from "react";
import { Link } from "react-router-dom";

function LoginControl(props) {
  if (!props.userToken) return <Link to="/login">Login</Link>;
  return <Link to="/logout">Logout</Link>;
}

export default LoginControl;
