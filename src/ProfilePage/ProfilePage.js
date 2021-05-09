import { useState, useContext } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "../context/authContext";
import { Input, Form, Button, Card } from "antd";

function PasswordInputGroup({ disabled, ...rest }) {
  return (
    <Input.Group {...rest}>
      <Form.Item name={["password", "password"]}>
        <Input.Password placeholder="Type old password here" />
      </Form.Item>
      <Form.Item name={["password", "new_password"]}>
        <Input.Password
          placeholder="Type new password here"
          disabled={disabled}
        />
      </Form.Item>
    </Input.Group>
  );
}

function ProfileSettingsForm({
  user,
  submitButtonComponent: SubmitButton,
  tailLayout,
  ...rest
}) {
  const [fields, setFields] = useState([
    {
      name: ["username"],
      value: user.username,
    },
    {
      name: ["password", "password"],
      value: null,
    },
    {
      name: ["password", "new_password"],
      value: null,
    },
  ]);

  return (
    <Form
      initialValues={user}
      {...rest}
      onFieldsChange={(_, allFields) => setFields(allFields)}
    >
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        required={false}
        hasFeedback
        validateStatus={user.email_confirmed ? "success" : "warning"}
      >
        <Input value={user.email} disabled />
      </Form.Item>
      <Form.Item label="Password">
        <PasswordInputGroup disabled={!fields[1].value} />
      </Form.Item>
      <Form.Item style={{ float: "right" }}>
        <SubmitButton
          type="primary"
          form={rest.name}
          htmlType="submit"
          disabled={!(fields[0].touched || fields[2].touched)}
        >
          Save
        </SubmitButton>
      </Form.Item>
    </Form>
  );
}

export default function ProfilePage() {
  const authState = useContext(AuthContext);
  const execute = useApi();

  const handleFinish = async (values) => {
    const [res, data] = await execute("users/@me", {
      method: "PUT",
      body: JSON.stringify({ username: values.username, ...values.password }),
    });
  };

  const profileFormLayout = { labelCol: { span: 4, pull: 1 } };

  return (
    authState.user !== null && (
      <Card style={{ maxWidth: "50vw" }}>
        <ProfileSettingsForm
          {...profileFormLayout}
          size="large"
          user={authState.user}
          name="profileSettingsForm"
          onFinish={handleFinish}
          submitButtonComponent={Button}
        />
      </Card>
    )
  );
}
