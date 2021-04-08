import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Space,
  Button,
} from "antd";
import { useState } from "react";

const inputTypeMap = {
  number: InputNumber,
  text: Input,
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required,
  ...restProps
}) => {
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
};

const EditableTable = ({
  tableData,
  setTableData,
  columns,
  onEdit,
  onDelete,
  ...rest
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const deleteRow = async (record) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => item.key === record.key);
    newData.splice(index, 1);
    setTableData(newData);
    if (onDelete) await onDelete(record);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      let item = null;

      if (index > -1) {
        item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setTableData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey("");
      }

      const newItem = newData[newData.findIndex((item) => key === item.key)];
      if (onEdit) await onEdit(item, newItem);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const copy = (record) =>
    navigator.clipboard.writeText(
      `${window.location.origin.toString()}/u/${record.name}`
    );

  const editColumn = {
    title: null,
    dataIndex: "operation",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
            htmlType="submit"
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <Typography.Link>Cancel</Typography.Link>
          </Popconfirm>
        </span>
      ) : (
        <Space size="small">
          <Button disabled={editingKey !== ""} onClick={() => copy(record)}>
            Copy
          </Button>
          <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Button>
          <Button
            disabled={editingKey !== ""}
            onClick={() => deleteRow(record)}
            danger
          >
            Delete
          </Button>
        </Space>
      );
    },
  };

  columns = [...columns];
  columns.push(editColumn);
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType ?? "text",
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        {...rest}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagintion={{
          onChange: () => setEditingKey(""),
          defaultPageSize: 20,
        }}
      />
    </Form>
  );
};

export default EditableTable;
