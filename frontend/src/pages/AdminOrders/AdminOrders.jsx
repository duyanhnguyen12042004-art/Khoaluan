import "./AdminOrders.scss";
import { useEffect, useState } from "react";
import { Card, Table, Select, Tag, Space, Button, Modal, message } from "antd";

import { getAllOrders, updateOrderStatus } from "../../services/orderApi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Câp nhật trạng thái đơn hàng
  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(selectedId, selectedStatus);

      message.success("Cập nhật thành công");

      setOpenStatus(false);

      loadOrders();
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((item) => item.status === statusFilter);

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
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Tổng tiền",
      render: (_, record) => record.total.toLocaleString("vi-VN") + "đ",
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
    },
    {
      title: "Trạng thái",
      render: (_, record) => <Tag color="blue">{record.status}</Tag>,
    },
    {
      title: "Ngày đặt",
      render: (_, record) =>
        new Date(record.created_at).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedOrder(record);
              setOpenDetail(true);
            }}
          >
            Xem
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setSelectedId(record.id);
              setSelectedStatus(record.status);
              setOpenStatus(true);
            }}
          >
            Đổi trạng thái
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Quản lý đơn hàng"
      extra={
        <Select
          value={statusFilter}
          style={{ width: 180 }}
          onChange={setStatusFilter}
          options={[
            {
              value: "all",
              label: "Tất cả",
            },
            {
              value: "Pending",
              label: "Pending",
            },
            {
              value: "Confirmed",
              label: "Confirmed",
            },
            {
              value: "Shipping",
              label: "Shipping",
            },
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Cancelled",
              label: "Cancelled",
            },
          ]}
        />
      }
    >
      <Table rowKey="id" dataSource={filteredOrders} columns={columns} />

      {/* Xem chi tiết đơn hàng */}
      <Modal
        title="Chi tiết đơn hàng"
        open={openDetail}
        footer={null}
        onCancel={() => setOpenDetail(false)}
        width={700}
      >
        {selectedOrder && (
          <>
            <p>
              <b>Mã đơn:</b> {selectedOrder.id}
            </p>

            <div className="order-detail">
              <div className="section">
                <h3>Thông tin khách hàng</h3>

                <div className="info-grid">
                  <div className="item">
                    <label>Khách hàng: </label>
                    <span>{selectedOrder.fullname}</span>
                  </div>

                  <div className="item">
                    <label>Số điện thoại: </label>
                    <span>{selectedOrder.phone}</span>
                  </div>

                  <div className="item">
                    <label>Địa chỉ: </label>
                    <span>{selectedOrder.address}</span>
                  </div>

                  <div className="item">
                    <label>Thanh toán: </label>
                    <span>{selectedOrder.payment}</span>
                  </div>

                  <div className="item">
                    <label>Trạng thái: </label>
                    <span>{selectedOrder.status}</span>
                  </div>

                  <div className="item">
                    <label>Tổng tiền: </label>
                    <span>{selectedOrder.total.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3>Sản phẩm: </h3>

                {selectedOrder.items.map((item, index) => (
                  <div className="product-item" key={index}>
                    <div className="left">
                      <h4>{item.name}</h4>

                      <p>Màu: {item.color}</p>

                      <p>Size: {item.size}</p>

                      <p>Số lượng: {item.quantity}</p>
                    </div>

                    <div className="right">
                      <div className="price">
                        Giá: {item.price.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
          </>
        )}
      </Modal>

      {/* Cập nhật trạng thái đơn hàng */}
      <Modal
        title="Đổi trạng thái đơn hàng"
        open={openStatus}
        onCancel={() => setOpenStatus(false)}
        footer={null}
      >
        <Select
          style={{ width: "100%" }}
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={[
            {
              value: "Pending",
              label: "Pending",
            },
            {
              value: "Confirmed",
              label: "Confirmed",
            },
            {
              value: "Shipping",
              label: "Shipping",
            },
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Cancelled",
              label: "Cancelled",
            },
          ]}
        />

        <Button
          type="primary"
          block
          style={{ marginTop: 20 }}
          onClick={handleUpdateStatus}
        >
          Lưu
        </Button>
      </Modal>
    </Card>
  );
}

export default AdminOrders;
