import React from "react";
import { Form, Input, Button, Space } from "antd";
import { Redirect } from "react-router-dom";
import "../css/LoginPage.css";
import config from "../config";

// TODO?: make LoginPage a function

function login(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(config.apiUrl + "token", requestOptions);
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      loginError: null,
    };
  }

  handleFinish(values) {
    login(values.username, values.password).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          this.props.setUserToken(data.access_token);
          this.setState({ redirectToReferrer: true });
        } else {
          this.setState({ loginError: data.detail });
        }
      });
    });
  }

  render() {
    if (this.state.redirectToReferrer)
      return <Redirect to={this.props.referrer ?? "/"} />;

    return (
      <div className="centered">
        <Space direction="vertical">
          {this.state.loginError && (
            <div className="error">{this.state.loginError}</div> // TODO: Error component uses antd.Alert
          )}

          <Form
            name="login"
            layout="vertical"
            onFinish={(values) => this.handleFinish(values)}
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
}

export default LoginPage;
