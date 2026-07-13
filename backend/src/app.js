import express from "express";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import { connectDatabase } from "./config/database.js";

const app = express();

await connectDatabase();

app.use(cors());
app.use(express.json());

// Route
app.use("/api/auth", authRoute);

export default app;