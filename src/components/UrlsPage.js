import "../css/UrlsPage.css";
import React, { useState, useEffect } from "react";
import { fetchApi } from "../hooks/useApi";
import { useError } from "../hooks/useError";
import { Loading, CreateLinkButton, EditableTable } from ".";

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

// TODO: separate loading page
//        and hook for api

export default function UrlsPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const throwError = useError();

  useEffect(() => {
    async function fetchTableData() {
      const [res, resData] = await fetchApi(
        `v1/urls?page=${currentPage}&items=25`,
        { method: "GET" },
        props.userToken
      );

      if (!res.ok && res.status === 401) {
        throwError({ text: resData.detail, status: res.status });
        return;
      }

      if (isLoading) setIsLoading(false);
      if (resData === null || !resData.length) return;
      setData([...data, ...resData]);
      setCurrentPage(currentPage + 1);
    }
    fetchTableData();
  }, [currentPage]);

  if (isLoading) return <Loading />;

  const handleEdit = async (before, after) => {
    const [res, resData] = await fetchApi(
      `v1/urls/${before.name}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: after.name,
          destination: after.destination,
          max_uses: after.max_uses,
        }),
      },
      props.userToken
    );

    if (!res.ok && res.status === 401)
      throwError({ text: resData.detail, status: res.status });
  };

  const handleDelete = async (record) => {
    const [res, resData] = await fetchApi(
      `v1/urls/${record.name}`,
      { method: "DELETE" },
      props.userToken
    );

    if (!res.ok && res.status === 401)
      throwError({ text: resData.detail, status: res.status });
  };

  const handleCreate = async (values) => {
    const [res, resData] = await fetchApi(
      "v1/urls",
      {
        method: "POST",
        body: JSON.stringify(values),
      },
      props.userToken
    );

    if (!res.ok) {
      if (res.status === 401)
        throwError({ text: resData.detail, status: res.status });

      return;
    }

    setData([...data, resData]);
  };

  return (
    <>
      <CreateLinkButton
        size="large"
        className="create-link-button"
        onCreate={handleCreate}
      />
      <EditableTable
        className="urls-table"
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
    </>
  );
}
