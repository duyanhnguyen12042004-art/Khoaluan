import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

// Tạo __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn đến db.json
const file = path.join(__dirname, "../database/db.json");

const adapter = new JSONFile(file);

// Dữ liệu mặc định
const defaultData = {
  users: [],
  products: [],
  orders: [],
  reviews: [],
};

const db = new Low(adapter, defaultData);

// Hàm khởi tạo database
export async function connectDatabase() {
  await db.read();

  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }

  console.log("LowDB Connected");
}

export default db;
