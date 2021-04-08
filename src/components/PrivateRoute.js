import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, userToken, ...rest }) {
  return userToken !== null ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
