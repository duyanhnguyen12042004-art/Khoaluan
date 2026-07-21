import express from "express";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import { connectDatabase } from "./config/database.js";

const app = express();

await connectDatabase();

app.use(cors());
app.use(express.json());

// Route
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);

export default app;
