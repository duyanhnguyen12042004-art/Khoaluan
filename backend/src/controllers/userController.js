import * as userService from "../services/userService.js";

// Lấy tất cả người dùng
export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Lấy thông tin người dùng
export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

// Cập nhật thông tin người dùng
export async function updateUser(req, res) {
  try {
    const result = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}