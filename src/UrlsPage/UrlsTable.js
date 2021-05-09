import { useState } from "react";
import { Table, Popconfirm, Form, Typography, Space, Button } from "antd";
import EditableTableCell from "./EditableTableCell";

export default function EditableTable({
  tableData,
  setTableData,
  columns,
  onEdit,
  onDelete,
  ...rest
}) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  // TODO: state for tableData = useState([...props.data]);

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
    } catch (errInfo) {}
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
            cell: EditableTableCell,
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
}
