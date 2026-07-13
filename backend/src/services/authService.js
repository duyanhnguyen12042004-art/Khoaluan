import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import db from "../config/database.js";
import jwt from "jsonwebtoken";

// Khóa bí mật để tạo JWT
const SECRET_KEY = "my_secret_key";

// Hàm đăng ký
export async function register(data) {
  await db.read();

  const { fullname, email, phone, password } = data;

  // Kiểm tra email đã tồn tại
  const exist = db.data.users.find((user) => user.email === email);

  if (exist) {
    throw new Error("Email đã tồn tại");
  }

  // Mã hóa mật khẩu
  const hashPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const newUser = {
    id: nanoid(),
    fullname,
    email,
    phone,
    password: hashPassword,
  };

  // Lưu vào database
  db.data.users.push(newUser);

  await db.write();

  return {
    message: "Đăng ký thành công",
  };
}

// Hàm đăng nhập
export async function login(data) {
  await db.read();

  const { email, password } = data;

  // Tìm người dùng theo email
  const user = db.data.users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Email không tồn tại");
  }

  // So sánh mật khẩu
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new Error("Sai mật khẩu");
  }

  // Tạo JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return {
    message: "Đăng nhập thành công",
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    },
  };
}