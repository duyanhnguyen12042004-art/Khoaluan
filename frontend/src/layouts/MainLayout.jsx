import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AppHeader from "../component/Header/Header";
import AppFooter from "../component/Footer/Footer";

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Content
        style={{
          padding: "30px 60px",
          background: "#fff",
        }}
      >
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
}

export default MainLayout;
