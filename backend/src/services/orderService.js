import db from "../config/database.js";
import { nanoid } from "nanoid";

// Tạo đơn hàng
export async function createOrder(data) {
  await db.read();

  const {
    userId,
    fullname,
    phone,
    address,
    payment,
    items,
  } = data;

  if (!fullname || !phone || !address) {
    throw new Error("Thiếu thông tin người nhận");
  }

  if (!items || items.length === 0) {
    throw new Error("Giỏ hàng đang trống");
  }

  let total = 0;

  // Kiểm tra tồn kho
  for (const item of items) {
    const product = db.data.products.find(
      (p) => p.id === item.productId
    );

    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm ${item.productId}`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} không đủ số lượng`);
    }

    total += item.price * item.quantity;
  }

  // Cập nhật kho
  for (const item of items) {
    const product = db.data.products.find(
      (p) => p.id === item.productId
    );

    product.stock -= item.quantity;
    product.sold += item.quantity;
  }

  const order = {
    id: nanoid(),

    userId,

    fullname,

    phone,

    address,

    payment,

    status: "Pending",

    total,

    items,

    created_at: new Date().toISOString(),
  };

  db.data.orders.push(order);

  await db.write();

  return order;
}

// Lấy tất cả đơn hàng
export async function getAllOrders() {
  await db.read();

  return db.data.orders;
}

// Lấy tất cả đơn hàng của một người dùng
export async function getOrdersByUser(userId) {
  await db.read();

  const orders = db.data.orders.filter(
    (item) => item.userId === userId
  );

  return orders;
}

// Lấy chi tiết đơn hàng
export async function getOrderById(id) {
  await db.read();

  const order = db.data.orders.find(
    (item) => item.id === id
  );

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng");
  }

  return order;
}

// Cập nhật trạng thái
export async function updateOrderStatus(
  id,
  status
) {
  await db.read();

  const order = db.data.orders.find(
    (item) => item.id === id
  );

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng");
  }

  order.status = status;

  await db.write();

  return order;
}

// Xóa đơn hàng
export async function deleteOrder(id) {
  await db.read();

  const index = db.data.orders.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Không tìm thấy đơn hàng");
  }

  db.data.orders.splice(index, 1);

  await db.write();

  return {
    message: "Xóa đơn hàng thành công",
  };
}