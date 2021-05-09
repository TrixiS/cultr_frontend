import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { fetchApi } from "../hooks/useApi";
import LoginForm from "./LoginForm";

export default function RegisterPage() {
  const [authData, setAuthData] = useState(null);
  const [fields, setFields] = useState([
    {
      name: ["username"],
      value: null,
    },
    {
      name: ["password"],
      value: null,
    },
    {
      name: ["email"],
      value: null,
    },
  ]);

  if (authData !== null)
    return <Redirect to={{ pathname: "/login", state: { ...authData } }} />;

  const handleFinish = async (values) => {
    const [res, _] = await fetchApi("users", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.ok)
      setAuthData({ username: fields[0].value, password: fields[1].value });
  };

  return (
    <div className="centered">
      <LoginForm
        name="register"
        onFinish={handleFinish}
        onFieldsChange={(_, allFields) => setFields(allFields)}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "You have to specify your email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
      </LoginForm>
    </div>
  );
}
