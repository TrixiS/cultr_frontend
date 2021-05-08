import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function LogoutPage({ referrer }) {
  const authState = useContext(AuthContext);

  useEffect(() => {
    authState.setAccessToken(null);
  });

  return <Redirect to={referrer ?? "/"} />;
}
