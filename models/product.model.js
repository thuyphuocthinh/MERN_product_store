import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    price: {
      type: Number,
      requied: true,
    },
    image: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
// Product => products in mongodb
export default Product;
