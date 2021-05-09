import { Input, InputNumber, Form } from "antd";

const inputTypeMap = {
  number: InputNumber,
  text: Input,
};

export default function EditableTableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required,
  ...restProps
}) {
  const InputComponent = inputTypeMap[inputType];

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <InputComponent />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
