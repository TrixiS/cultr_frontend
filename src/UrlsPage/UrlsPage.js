import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { useLoading } from "../hooks/useLoading";
import { Typography, Space, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import CreateUrlButton from "./CreateUrlButton";
import UrlsTable from "./UrlsTable";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "15%",
    editable: true,
  },
  {
    title: "Destination",
    dataIndex: "destination",
    width: "40%",
    editable: true,
    render: (text) => <Typography.Link href={text}>{text}</Typography.Link>,
  },
  {
    title: "Uses",
    dataIndex: "uses",
    width: "15%",
    editable: false,
    inputType: "number",
  },
  {
    title: "Max uses",
    dataIndex: "max_uses",
    width: "15%",
    editable: true,
    required: false,
    inputType: "number",
  },
];

export default function UrlsPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, setIsLoading } = useLoading(true);
  const execute = useApi();

  useEffect(() => {
    const fetchTableData = async () => {
      const [res, resData] = await execute(
        `v1/urls?page=${currentPage}&items=25`,
        {
          method: "GET",
        }
      );

      setIsLoading(false);

      if (!res.ok || resData === null || !resData.length) return;
      setData((d) => [...d, ...resData]);
      setCurrentPage((page) => page + 1);
    };

    fetchTableData();
  }, [currentPage]);

  const handleEdit = async (before, after) =>
    await execute(`v1/urls/${before.name}`, {
      method: "PUT",
      body: JSON.stringify({
        name: after.name,
        destination: after.destination,
        max_uses: after.max_uses,
      }),
    });

  const handleDelete = async (record) =>
    await execute(`v1/urls/${record.name}`, { method: "DELETE" });

  const handleCreate = async (values) => {
    const [res, resData] = await execute("v1/urls", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.ok) setData([...data, resData]);
  };

  const handleReload = () => {
    setData([]);
    setCurrentPage(1);
  };

  return (
    !isLoading && (
      <Space direction="vertical">
        <Space direction="horizontal" style={{ float: "right" }}>
          <Button size="large" onClick={handleReload}>
            <ReloadOutlined />
          </Button>
          <CreateUrlButton size="large" onCreate={handleCreate} />
        </Space>
        <UrlsTable
          columns={columns}
          tableData={data.map((item) => {
            item.key = item.id.toString();
            return item;
          })}
          setTableData={setData}
          scroll={{ x: true }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Space>
    )
  );
}
