import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function LoginControl() {
  const authState = useContext(AuthContext);

  return (
    <>
      {authState.user === null ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
    </>
  );
}
