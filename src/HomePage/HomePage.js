import { Row, Col, Typography, Space, Card } from "antd";
import CenteredRow from "../CenteredRow";

function HomePageTitle({ children }) {
  return (
    <Typography.Title
      style={{ textAlign: "center", fontSize: "30px" }}
      level={2}
    >
      <Typography.Text strong>{children}</Typography.Text>
    </Typography.Title>
  );
}

function HomePageParagraph({ style, children }) {
  return (
    <Typography.Paragraph
      style={{ textAlign: "center", fontSize: "15px", ...style }}
    >
      {children}
    </Typography.Paragraph>
  );
}

export default function HomePage() {
  const featuresCardStyle = { minWidth: "100%", minHeight: "100%" };

  // TODO: xs xl and so on spans for card cols
  return (
    <Space direction="vertical" size="large">
      <CenteredRow>
        <HomePageTitle>Simple URL Shortener</HomePageTitle>
        <HomePageParagraph>
          Take full control over your links, shorten long links, monitor your
          link statistics
        </HomePageParagraph>
      </CenteredRow>
      <CenteredRow>
        <HomePageTitle>Features</HomePageTitle>
        <Row justify="center" align="middle">
          <Col>
            <Card title="Link Aliases" style={featuresCardStyle}>
              <HomePageParagraph style={{ textAlign: "left" }}>
                Set your own custom name to your link. Links with custom name
                are more readable and useable
              </HomePageParagraph>
            </Card>
          </Col>
          <Col>
            <Card title="Link Statistics" style={featuresCardStyle}>
              <HomePageParagraph style={{ textAlign: "left" }}>
                Keep track of the number of clicks on each of your links
              </HomePageParagraph>
            </Card>
          </Col>
          <Col>
            <Card
              title="Link Management"
              style={{ minWidth: "100%", minHeight: "100%" }}
            >
              <HomePageParagraph style={{ textAlign: "left" }}>
                Set the link expiration parameters by date or by number of
                clicks
              </HomePageParagraph>
            </Card>
          </Col>
        </Row>
      </CenteredRow>
    </Space>
  );
}
