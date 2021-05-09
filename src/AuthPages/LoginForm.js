import { Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginForm({ name, children, ...rest }) {
  return (
    <div className="centered">
      <Form name={name} size="large" layout="vertical" {...rest}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "You have to specify your username",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "You have to specify your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        {children}
        <Form.Item>
          <Button
            form={name}
            type="primary"
            htmlType="submit"
            style={{ minWidth: "100%" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
