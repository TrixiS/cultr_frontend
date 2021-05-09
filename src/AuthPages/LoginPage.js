import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Space, Form, Button } from "antd";
import { AuthContext } from "../context/authContext";
import LoginForm from "./LoginForm";

function login(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(process.env.REACT_APP_API_URL + "token", requestOptions);
}

export default function LoginPage({ referrer, location }) {
  const [loginError, setLoginError] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const authState = useContext(AuthContext);
  const { username, password } = location?.state ?? {};

  if (
    shouldRedirect &&
    authState.accessToken !== null &&
    authState.user !== null
  )
    return <Redirect to={referrer ?? "/"} />;

  const handleFinish = (values) => {
    login(values.username, values.password).then((res) =>
      res.json().then((data) => {
        if (res.ok) {
          authState.setAccessToken(data.access_token);
          setShouldRedirect(true);
          return;
        }

        setLoginError(data.detail);
      })
    );
  };

  return (
    <div className="centered">
      <Space direction="vertical">
        {loginError && (
          <div style={{ color: "red" }}>{loginError}</div> // TODO: Error component uses antd.Alert
        )}
        <LoginForm
          name="login"
          onFinish={handleFinish}
          initialValues={{ username, password }}
        >
          <Form.Item>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </LoginForm>
      </Space>
    </div>
  );
}
