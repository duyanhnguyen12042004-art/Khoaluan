import db from "../config/database.js";

// Lấy tất cả người dùng
export async function getAllUsers() {
  await db.read();

  return db.data.users.map((user) => {
    const { password, ...userInfo } = user;
    return userInfo;
  });
}

// Lấy thông tin người dùng
export async function getUserById(id) {
  await db.read();

  const user = db.data.users.find((item) => item.id === id);

  if (!user) {
    throw new Error("Không tìm thấy người dùng");
  }

  // Không trả password về frontend
  const { password, ...userInfo } = user;

  return userInfo;
}

// Cập nhật thông tin người dùng
export async function updateUser(id, data) {
  await db.read();

  const user = db.data.users.find((item) => item.id === id);

  if (!user) {
    throw new Error("Không tìm thấy người dùng");
  }

  // Kiểm tra email đã tồn tại chưa
  const emailExists = db.data.users.find(
    (item) => item.email === data.email && item.id !== id,
  );

  if (emailExists) {
    throw new Error("Email đã được sử dụng");
  }

  user.fullname = data.fullname;
  user.email = data.email;
  user.phone = data.phone;

  await db.write();

  // Không trả password về frontend
  const { password, ...userInfo } = user;

  return {
    message: "Cập nhật thông tin thành công",
    user: userInfo,
  };
}

// Xóa người dùng
export async function deleteUser(id) {
  await db.read();

  const index = db.data.users.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy người dùng");
  }

  // Không cho xóa tài khoản Admin
  if (db.data.users[index].role === 1) {
    throw new Error("Không thể xóa tài khoản Admin");
  }

  db.data.users.splice(index, 1);

  await db.write();

  return {
    message: "Xóa người dùng thành công",
  };
}
