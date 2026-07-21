import express from "express";

import * as productController from "../controllers/productController.js";

const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", productController.getAllProducts);

// Lấy chi tiết
router.get("/:id", productController.getProductById);

// Thêm sản phẩm
router.post("/", productController.createProduct);

// Cập nhật
router.put("/:id", productController.updateProduct);

// Xóa
router.delete("/:id", productController.deleteProduct);

export default router;