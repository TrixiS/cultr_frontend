import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
import "../css/LoginPage.css";

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

export default function LoginPage(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleFinish = (values) => {
    login(values.username, values.password).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          props.setUserToken(data.access_token);
          setRedirectToReferrer(true);
        } else {
          setLoginError(data.detail);
        }
      });
    });
  };

  if (redirectToReferrer) return <Redirect to={props.referrer ?? "/"} />;

  return (
    <div className="centered">
      <Space direction="vertical">
        {loginError && (
          <div className="error">{loginError}</div> // TODO: Error component uses antd.Alert
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
