import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Modal,
  Popconfirm,
  message,
} from "antd";

import { getAllUsers, deleteUser } from "../../services/userApi";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [openDetail, setOpenDetail] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);

      message.success("Xóa người dùng thành công");

      loadUsers();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Không thể xóa người dùng",
      );
    }
  };
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Vai trò",
      render: (_, record) =>
        record.role === 1 ? (
          <Tag color="red">Admin</Tag>
        ) : (
          <Tag color="blue">User</Tag>
        ),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedUser(record);
              setOpenDetail(true);
            }}
          >
            Xem
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDeleteUser(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý người dùng">
      <Table rowKey="id" columns={columns} dataSource={users} />
      <Modal
        title="Thông tin người dùng"
        open={openDetail}
        footer={null}
        onCancel={() => setOpenDetail(false)}
      >
        {selectedUser && (
          <div>
            <p>
              <b>Họ tên:</b> {selectedUser.fullname}
            </p>

            <p>
              <b>Email:</b> {selectedUser.email}
            </p>

            <p>
              <b>SĐT:</b> {selectedUser.phone}
            </p>

            <p>
              <b>Vai trò:</b> {selectedUser.role === 1 ? "Admin" : "User"}
            </p>
          </div>
        )}
      </Modal>
    </Card>
  );
}

export default AdminUsers;
