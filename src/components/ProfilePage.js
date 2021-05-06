import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Divider, Row, Col, Card, Typography, Input, Form, Button } from "antd";

const CardForm = ({ items, cardProps, ...rest }) => {
  const labelColStyle = { width: "30%" };
  const contentColStyle = { width: "70%" };
  const formItems = [];

  for (const item of items)
    formItems.push(
      <Form.Item {...item.itemProps}>
        <Row>
          <Col style={labelColStyle}>
            <Typography.Text strong>{item.label}</Typography.Text>
          </Col>
          <Col style={contentColStyle}>
            <Typography.Text>{item.content}</Typography.Text>
          </Col>
        </Row>
      </Form.Item>
    );

  return (
    <Card {...cardProps} style={{ width: "60%" }}>
      <Form {...rest}>
        {formItems.map((item, index) => (
          <>
            {index > 0 && <Divider />}
            {item}
          </>
        ))}
      </Form>
    </Card>
  );
};

export default function ProfilePage() {
  const authState = useContext(AuthContext);

  const [fields, setFields] = useState([
    {
      name: ["username"],
      value: authState.user?.username,
    },
    {
      name: ["email"],
      value: authState.user?.email,
    },
    {
      name: ["password"],
      value: "",
    },
  ]);

  const handleFinish = (values) => {
    console.log("Submited");
  };

  const items = [
    {
      label: "Username",
      content: <Input value={fields[0].value ?? authState.user?.username} />,
      itemProps: { name: "username" },
    },
    {
      label: "Email",
      content: <Input value={fields[1].value ?? authState.user?.email} />,
      itemProps: { name: "email" },
    },
    {
      label: "Password",
      content: <Input.Password placeholder="Type new password here" />,
      itemProps: { name: "password" },
    },
  ];

  // TODO: use just form and layout (may be layout={grid} or something)
  return (
    <CardForm
      title="Profile settings"
      items={items}
      fields={fields}
      name="profileSettingsForm"
      onFieldsChange={(_, allFields) => setFields(allFields)}
      onFinish={handleFinish}
      cardProps={{
        title: "Profile settings",
        actions: [
          <Button
            form="profileSettingsForm"
            type="primary"
            htmlType="submit"
            disabled={!fields.some((f) => f.touched)}
            style={{ float: "right", marginRight: "1vw" }}
            size="large"
          >
            Save
          </Button>,
        ],
      }}
    />
  );
}
