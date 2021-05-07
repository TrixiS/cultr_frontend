import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function PrivateRoute({ children, ...rest }) {
  const authState = useContext(AuthContext);

  return authState.accessToken === null ? (
    <Redirect to="/login" />
  ) : (
    <Route {...rest}>{children}</Route>
  );
}
