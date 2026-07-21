import "./Login.scss";
import logo from "../../assets/images/logo.png";
import { Button, Card, Checkbox, Divider, Form, Input, Typography } from "antd";

import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { login } from "../../services/authApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const { Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const res = await login(values);

      // Lưu token
      localStorage.setItem("token", res.data.token);

      // Lưu user vào AuthContext
      authLogin(res.data.user);

      message.success(res.data.message);

      // Chuyển sang trang chủ
      navigate("/home");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login">
      <Card className="login__card">
        <img src={logo} alt="Logo" className="login__logo" />

        <Text className="login__subtitle">Đăng nhập vào hệ thống</Text>

        <Form layout="vertical" onFinish={onFinish} className="login__form">
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
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <div className="login__options">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>

            <a href="#">Quên mật khẩu?</a>
          </div>

          <Button type="primary" htmlType="submit" block size="large">
            Đăng nhập
          </Button>

          <Divider>Hoặc</Divider>

          <Button block size="large" icon={<GoogleOutlined />}>
            Đăng nhập bằng Google
          </Button>

          <div className="login__footer">
            Chưa có tài khoản?
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
