import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Lấy tất cả người dùng
export const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy thông tin người dùng
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Cập nhật thông tin
export const updateUser = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Xóa người dùng
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
