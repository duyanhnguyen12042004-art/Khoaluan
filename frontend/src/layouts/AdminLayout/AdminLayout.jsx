import "./AdminLayout.scss";

import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/admin">Tổng quan</Link>,
  },
  {
    key: "products",
    icon: <ShoppingOutlined />,
    label: <Link to="/admin/products">Quản lý sản phẩm</Link>,
  },
  {
    key: "orders",
    icon: <ShoppingCartOutlined />,
    label: <Link to="/admin/orders">Quản lý đơn hàng</Link>,
  },
  {
    key: "users",
    icon: <UserOutlined />,
    label: <Link to="/admin/users">Quản lý khách hàng</Link>,
  },
];

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <Layout className="admin-layout">
      <Sider className="admin-sider" width={240}>
        <div className="admin-logo">
          <span>S.PEARL</span>
        </div>

        <Menu
          theme="light"
          mode="inline"
          items={items}
          defaultSelectedKeys={["dashboard"]}
        />
      </Sider>

      <Layout>
        <Header className="admin-header">
          <span>Dashboard Quản trị</span>
          <Button type="primary" onClick={() => navigate("/home")}>
            Về trang chủ
          </Button>
        </Header>

        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
