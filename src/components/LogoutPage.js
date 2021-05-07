import { Redirect } from "react-router-dom";
import { useEffect } from "react";

function LogoutPage(props) {
  useEffect(() => {
    props.setAccessToken(null);
  });

  return <Redirect to={props.referrer ?? "/"} />;
}

export default LogoutPage;
