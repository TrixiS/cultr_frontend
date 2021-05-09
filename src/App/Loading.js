import { useContext } from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LoadingContext } from "../context/loadingContext";
import "./css/Loading.css";

const { Content } = Layout;
const spinner = <LoadingOutlined spin />;

export default function Loading({ children }) {
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      {isLoading === true && (
        <Layout style={{ backgroundColor: "#fff" }}>
          <Content className="loading-spinner">
            <Spin size="large" indicator={spinner} />
          </Content>
        </Layout>
      )}
      {children}
    </>
  );
}
