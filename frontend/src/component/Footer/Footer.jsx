import "./Footer.scss";

import { Layout, Row, Col, Input, Button, Flex } from "antd";

import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/logo.png";

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer className="app-footer">
      <Row gutter={40}>
        <Col span={8}>
          <img src={logo} className="footer-logo" />

          <p>Công ty Cổ phần Thương mại...</p>
        </Col>

        <Col span={5}>
          <h3>Theo dõi chúng tôi</h3>

          <Flex gap={15}>
            <FacebookFilled />

            <InstagramFilled />

            <YoutubeFilled />

            <TikTokOutlined />
          </Flex>
        </Col>

        <Col span={6}>
          <h3>Đăng ký nhận tin</h3>

          <Input placeholder="Email của bạn" />

          <Button type="primary" block style={{ marginTop: 10 }}>
            Đăng ký
          </Button>
        </Col>

        <Col span={5}>
          <h3>Chính sách</h3>

          <p>Đổi trả</p>

          <p>Bảo hành</p>

          <p>Điều khoản</p>
        </Col>
      </Row>
    </Footer>
  );
}

export default AppFooter;
