import express from "express";
import dotenv from "dotenv";
import * as database from "./config/database.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  database.connectDB();
  console.log(`Server started at port 5000`);
});

// app.eraser.io - diagrams
// 35:57
