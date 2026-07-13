import "./Header.scss";

import { Layout, Menu, Input, Flex } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const { Header } = Layout;

const items = [
  {
    key: "1",
    label: <Link to="/">Forever Young</Link>,
  },
  {
    key: "2",
    label: <Link to="/collection">Bộ sưu tập</Link>,
  },
  {
    key: "3",
    label: <Link to="/sale">Khuyến mại</Link>,
  },
  {
    key: "4",
    label: <Link to="/blog">Tạp chí</Link>,
  },
  {
    key: "5",
    label: <Link to="/store">Hệ thống cửa hàng</Link>,
  },
];

function AppHeader() {
  return (
    <Header className="app-header">
      <Flex justify="space-between" align="center" style={{ height: "100%" }}>
        {/* Logo */}

        <Flex align="center" gap={10}>
          <img src={logo} className="logo" />
        </Flex>

        {/* Menu */}

        <Menu
          mode="horizontal"
          items={items}
          selectable={false}
          className="header-menu"
        />

        {/* Right */}

        <Flex align="center" gap={20}>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            className="search-box"
          />

          <Link to="/login">
            <UserOutlined />
          </Link>

          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
