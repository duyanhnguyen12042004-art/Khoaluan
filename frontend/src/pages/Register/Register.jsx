import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { register } from "../../services/authApi";

import { Button, Card, Checkbox, Divider, Form, Input, Typography } from "antd";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/logo.png";

const { Text } = Typography;

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Không gửi confirmPassword và agree lên backend
      const registerData = {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };

      const res = await register(registerData);

      message.success(res.data.message);

      navigate("/login");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register">
      <Card className="register__card">
        <img src={logo} alt="Logo" className="register__logo" />

        <Text className="register__subtitle">Tạo tài khoản mới</Text>

        <Form layout="vertical" onFinish={onFinish} className="register__form">
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Email!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập Email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Bạn phải đồng ý điều khoản!")),
              },
            ]}
          >
            <Checkbox>Tôi đồng ý với điều khoản sử dụng</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Đăng ký
          </Button>

          <Divider>Hoặc</Divider>

          <Button block size="large" icon={<GoogleOutlined />}>
            Đăng ký bằng Google
          </Button>

          <div className="register__footer">
            Đã có tài khoản?
            <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
