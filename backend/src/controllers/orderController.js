import * as orderService from "../services/orderService.js";

// Tạo đơn hàng
export async function createOrder(req, res) {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Lấy tất cả đơn hàng
export async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Lấy tất cả đơn hàng của 1 người dùng
export async function getOrdersByUser(req, res) {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Lấy chi tiết đơn hàng
export async function getOrderById(req, res) {
  try {
    const order = await orderService.getOrderById(req.params.id);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// Cập nhật trạng thái
export async function updateOrderStatus(req, res) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Xóa đơn hàng
export async function deleteOrder(req, res) {
  try {
    const result = await orderService.deleteOrder(req.params.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}