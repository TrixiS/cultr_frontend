import { Redirect } from "react-router-dom";
import { useEffect } from "react";

function LogoutPage(props) {
  useEffect(() => {
    props.setUserToken(null);
  });

  return <Redirect to={props.referrer ?? "/"} />;
}

export default LogoutPage;
