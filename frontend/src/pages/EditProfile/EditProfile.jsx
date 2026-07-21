import "./EditProfile.scss";

import { useContext } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { updateUser as updateUserApi } from "../../services/userApi";

function EditProfile() {
  const navigate = useNavigate();

  const { user, updateUser } = useContext(AuthContext);

  const [form] = Form.useForm();

  if (!user) {
    navigate("/login");
    return null;
  }

  const onFinish = async (values) => {
    try {
      const res = await updateUserApi(user.id, values);

      // Cập nhật AuthContext
      updateUser(res.user);

      message.success(res.message);

      navigate("/profile");
    } catch (error) {
      message.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  return (
    <div className="edit-profile">
      <Card title="Chỉnh sửa thông tin">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Button htmlType="submit" type="primary" size="large">
            Lưu thay đổi
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default EditProfile;
