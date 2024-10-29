import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(">>> Error in getting products: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide product_id",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }
    const product = await Product.findById(id).lean();
    return res.status(200).json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.error(">>> Error in getting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide product_id",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(">>> Error in getting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide product_id",
      });
    }
    const result = await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error(">>> Error in getting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
