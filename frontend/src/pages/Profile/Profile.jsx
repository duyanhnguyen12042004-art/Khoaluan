import "./Profile.scss";
import { useContext } from "react";
import { Card, Avatar, Descriptions, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={90} icon={<UserOutlined />} />

          <h2>{user.fullname}</h2>
        </div>

        <Descriptions
          bordered
          column={1}
          style={{ marginTop: 30 }}
        >
          <Descriptions.Item label="Tên đăng nhập">
            {user.username}
          </Descriptions.Item>

          <Descriptions.Item label="Họ và tên">
            {user.fullname}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            {user.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Vai trò">
            {user.role === 1 ? "Quản trị viên" : "Khách hàng"}
          </Descriptions.Item>
        </Descriptions>

        <Button
          type="primary"
          style={{ marginTop: 30 }}
          onClick={() => navigate("/edit-profile")}
        >
          Chỉnh sửa thông tin
        </Button>
      </Card>
    </div>
  );
}

export default Profile;