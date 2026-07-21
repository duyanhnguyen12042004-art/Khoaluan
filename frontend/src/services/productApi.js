import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy chi tiết sản phẩm
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm sản phẩm
export const createProduct = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};