import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import db from "../config/database.js";
import jwt from "jsonwebtoken";

// Khóa bí mật để tạo JWT
const SECRET_KEY = "my_secret_key";

// ĐĂNG KÝ
export async function register(data) {
  await db.read();

  const { username, fullname, email, phone, password } = data;

  // Kiểm tra username
  const existUsername = db.data.users.find(
    (user) => user.username === username
  );

  if (existUsername) {
    throw new Error("Tên đăng nhập đã tồn tại");
  }

  // Kiểm tra email
  const existEmail = db.data.users.find(
    (user) => user.email === email
  );

  if (existEmail) {
    throw new Error("Email đã tồn tại");
  }

  // Mã hóa mật khẩu
  const hashPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const newUser = {
    id: nanoid(),
    username,
    fullname,
    email,
    phone,
    password: hashPassword,
    role: 2,
    created_at: new Date().toISOString(),
  };

  db.data.users.push(newUser);

  await db.write();

  return {
    message: "Đăng ký thành công",
  };
}

// ĐĂNG NHẬP
export async function login(data) {
  await db.read();

  const { email, password } = data;

  // Tìm user
  const user = db.data.users.find(
    (u) => u.email === email
  );

  if (!user) {
    throw new Error("Email không tồn tại");
  }

  // So sánh mật khẩu
  const checkPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!checkPassword) {
    throw new Error("Sai mật khẩu");
  }

  // Sinh JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
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
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
}