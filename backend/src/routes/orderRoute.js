import express from "express";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

// Tạo đơn hàng
router.post("/", orderController.createOrder);

// Lấy tất cả đơn hàng của 1 người dùng
router.get("/user/:userId", orderController.getOrdersByUser);

// Lấy tất cả đơn hàng
router.get("/", orderController.getAllOrders);

// Lấy chi tiết đơn hàng
router.get("/:id", orderController.getOrderById);

// Cập nhật trạng thái đơn hàng
router.put("/:id", orderController.updateOrderStatus);

// Xóa đơn hàng
router.delete("/:id", orderController.deleteOrder);

export default router;
