import "./AdminDashboard.scss";
import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table } from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { getAllProducts } from "../../services/productApi";
import { getAllOrders } from "../../services/orderApi";
import { getAllUsers } from "../../services/userApi";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productRes = await getAllProducts();
      const orderRes = await getAllOrders();
      const userRes = await getAllUsers();

      setProducts(productRes.data ?? productRes);
      setOrders(orderRes.data ?? orderRes);
      setUsers(userRes.data ?? userRes);
    } catch (error) {
      console.error("Lỗi tải Dashboard:", error);
    }
  };

  const revenue = orders.reduce((sum, item) => sum + (item.total || 0), 0);

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "fullname",
    },
    {
      title: "Tổng tiền",
      render: (_, record) => (record.total || 0).toLocaleString("vi-VN") + "đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  return (
    <div className="dashboard">
      <Row gutter={20}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sản phẩm"
              value={products.length}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn hàng"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Khách hàng"
              value={users.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={revenue}
              formatter={(value) => Number(value).toLocaleString("vi-VN") + "đ"}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Đơn hàng mới nhất" style={{ marginTop: 30 }}>
        <Table
          rowKey="id"
          dataSource={orders.slice().reverse()}
          columns={columns}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default AdminDashboard;
