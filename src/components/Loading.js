import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../css/Loading.css";

const spinner = <LoadingOutlined spin />;

export default function Loading() {
  return (
    <div className="loading-spinner">
      <Spin size="large" indicator={spinner} />
    </div>
  );
}
