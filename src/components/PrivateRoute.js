import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ErrorBoundary } from ".";
import { AuthContext } from "../context/authContext";

export default function PrivateRoute(props) {
  const authState = useContext(AuthContext);

  const handleError = (error) => {
    if (error.status === 401) {
      authState.setAccessToken(null);
      return <Redirect to="/login" />; // TODO: take path redirect in props
    }

    return <div>Something went wrong :(</div>;
  };

  return (
    <ErrorBoundary onError={handleError}>
      {authState.accessToken === null ? (
        <Redirect to="/login" />
      ) : (
        <Route {...props} />
      )}
    </ErrorBoundary>
  );
}
