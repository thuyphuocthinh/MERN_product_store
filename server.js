import express from "express";
import dotenv from "dotenv";
import * as database from "./config/database.js";
import Product from "./models/product.model.js";
dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products/create", async (req, res) => {
  try {
    const { name, price, image } = req.body.product;
    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newProduct = new Product({ name, price, image });
    await Product.create(newProduct);
    return res.status(200).json({
      message: "Success",
      data: newProduct,
    });
  } catch (error) {
    console.error(">>> Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide product_id",
      });
    }
    const product = await Product.findOne({ id: id }).lean();
    return res.status(200).json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.error(">>> Error in getting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(5000, () => {
  database.connectDB();
  console.log(`Server started at port 5000`);
});

// app.eraser.io - diagrams
