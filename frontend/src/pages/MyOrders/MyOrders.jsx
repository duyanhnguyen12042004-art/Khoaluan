import "./MyOrders.scss";

import { useContext, useEffect, useState } from "react";
import { Card, Empty, Table, Tag, Button, Modal, Descriptions, Image } from "antd";

import { AuthContext } from "../../context/AuthContext";
import { getOrdersByUser } from "../../services/orderApi";

function MyOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrdersByUser(user.id);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (value) => value.toLocaleString("vi-VN") + "đ",
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        if (status === "Pending") return <Tag color="orange">Chờ xác nhận</Tag>;

        if (status === "Shipping") return <Tag color="blue">Đang giao</Tag>;

        if (status === "Completed") return <Tag color="green">Hoàn thành</Tag>;

        return <Tag>{status}</Tag>;
      },
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedOrder(record);
            setOpenDetail(true);
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="my-orders">
      <Card title="Đơn hàng của tôi">
        {orders.length === 0 ? (
          <Empty description="Bạn chưa có đơn hàng nào" />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={orders}
            pagination={false}
          />
        )}
      </Card>

      <Modal
        title="Chi tiết đơn hàng"
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={null}
        width={900}
      >
        {selectedOrder && (
          <>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Mã đơn">
                {selectedOrder.id}
              </Descriptions.Item>

              <Descriptions.Item label="Người nhận">
                {selectedOrder.fullname}
              </Descriptions.Item>

              <Descriptions.Item label="Số điện thoại">
                {selectedOrder.phone}
              </Descriptions.Item>

              <Descriptions.Item label="Địa chỉ">
                {selectedOrder.address}
              </Descriptions.Item>

              <Descriptions.Item label="Thanh toán">
                {selectedOrder.payment}
              </Descriptions.Item>

              <Descriptions.Item label="Tổng tiền">
                {selectedOrder.total.toLocaleString("vi-VN")}đ
              </Descriptions.Item>
            </Descriptions>

            <h3 style={{ marginTop: 30 }}>Danh sách sản phẩm</h3>

            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <Image width={80} src={item.image} />

                <div>
                  <h4>{item.name}</h4>

                  <p>Màu: {item.color}</p>

                  <p>Size: {item.size}</p>

                  <p>Số lượng: {item.quantity}</p>

                  <p>{item.price.toLocaleString("vi-VN")}đ</p>
                </div>
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
}

export default MyOrders;
