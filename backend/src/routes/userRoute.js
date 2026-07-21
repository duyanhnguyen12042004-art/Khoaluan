import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Lấy tất cả user
router.get("/", userController.getAllUsers);

// Lấy thông tin 1 user
router.get("/:id", userController.getUserById);

// Cập nhật user
router.put("/:id", userController.updateUser);

export default router;
