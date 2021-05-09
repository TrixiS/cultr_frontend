import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
import { AuthContext } from "../context/authContext";

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

export default function LoginPage({ referrer }) {
  const [loginError, setLoginError] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const authState = useContext(AuthContext);

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

  if (
    shouldRedirect &&
    authState.accessToken !== null &&
    authState.user !== null
  )
    return <Redirect to={referrer ?? "/"} />;

  return (
    <div className="centered">
      <Space direction="vertical">
        {loginError && (
          <div style={{ color: "red" }}>{loginError}</div> // TODO: Error component uses antd.Alert
        )}
        <Form
          name="login"
          layout="vertical"
          onFinish={(values) => handleFinish(values)}
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "You have to specify your username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "You have to specify your password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}
