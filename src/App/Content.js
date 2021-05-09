import Loading from "./Loading";
import { Layout } from "antd";

import "./css/Content.css";

export default function Content({ children }) {
  return (
    <Layout.Content style={{ padding: "0 2vh" }}>
      <div className="site-layout-content">
        <Layout style={{ backgroundColor: "#fff" }}>
          <Loading>{children}</Loading>
        </Layout>
      </div>
    </Layout.Content>
  );
}
