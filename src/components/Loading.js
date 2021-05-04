import React, { useContext } from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../css/Loading.css";

const { Content } = Layout;

export const LoadingContext = React.createContext({
  isLoading: true,
  setIsLoading: () => {},
});

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
