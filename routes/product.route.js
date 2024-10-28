import express from "express";
const router = express.Router();
import * as productController from "../controllers/product.controller.js";

router.get("/", productController.getAllProducts);
router.post("/create", productController.createProduct);
router.get("/:id", productController.getProductById);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);

export default router;
