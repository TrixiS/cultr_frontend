import { Button, Modal, Form, DatePicker, Input, InputNumber } from "antd";
import { useState } from "react";

export default function CreateLinkButton({ onCreate, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const handleFinish = async (values) => {
    setIsLoading(true);
    await onCreate(values);
    setIsLoading(false);
    closeModal();
  };

  return (
    <>
      <Button
        type="primary"
        loading={isLoading}
        onClick={() => setIsModalVisible(true)}
        {...rest}
      >
        Create
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        title="Create link"
        footer={[
          <Button
            form="createLinkForm"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Create
          </Button>,
        ]}
      >
        <Form
          name="createLinkForm"
          onFinish={handleFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input link name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Destination"
            name="destination"
            rules={[
              { required: true, message: "Please input link destination!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Max uses" name="max_uses">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Expiration date" name="expiration_datetime">
            <DatePicker showTime format="YYYY-MM-DDTHH:mm:ssZ" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
