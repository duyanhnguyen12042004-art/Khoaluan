import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// Tạo đơn hàng
export const createOrder = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy đơn hàng theo user
export const getOrdersByUser = async (userId) => {
  const response = await axios.get(
    `http://localhost:5000/api/orders/user/${userId}`
  );

  return response.data.data;
};

// Lấy chi tiết đơn hàng
export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Cập nhật trạng thái
export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    status,
  });

  return response.data;
};

// Xóa đơn hàng
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};