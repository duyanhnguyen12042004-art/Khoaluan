import db from "../config/database.js";
import { nanoid } from "nanoid";

// Lấy tất cả sản phẩm
export async function getAllProducts() {
  await db.read();

  return db.data.products || [];
}

// Lấy sản phẩm theo id
export async function getProductById(id) {
  await db.read();

  const product = db.data.products.find(
    (item) => item.id === id
  );

  if (!product) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  return product;
}

// Thêm sản phẩm
export async function createProduct(data) {
  await db.read();

  const newProduct = {
    id: nanoid(),

    name: data.name,

    price: Number(data.price),

    description: data.description,

    variants: data.variants || [],

    sizes: data.sizes || [],

    category: data.category,

    stock: Number(data.stock),

    sold: 0,

    rating: 5,

    created_at: new Date().toISOString(),
  };

  db.data.products.push(newProduct);

  await db.write();

  return newProduct;
}

// Cập nhật sản phẩm
export async function updateProduct(id, data) {
  await db.read();

  const product = db.data.products.find(
    (item) => item.id === id
  );

  if (!product) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  product.name = data.name;

  product.price = Number(data.price);

  product.description = data.description;

  product.variants = data.variants || [];

  product.sizes = data.sizes || [];

  product.category = data.category;

  product.stock = Number(data.stock);

  await db.write();

  return product;
}

// Xóa sản phẩm
export async function deleteProduct(id) {
  await db.read();

  const index = db.data.products.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  db.data.products.splice(index, 1);

  await db.write();

  return {
    message: "Xóa thành công"
  };
}