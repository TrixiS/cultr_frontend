import { Row, Col } from "antd";

export default function CenteredRow({ children }) {
  return (
    <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 40 }}>
      <Col xs={1} sm={4} md={4} lg={4} xl={4} />
      <Col xs={22} sm={16} md={16} lg={16} xl={16}>
        {children}
      </Col>
      <Col xs={1} sm={4} md={4} lg={4} xl={4} />
    </Row>
  );
}
