import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = Router();

router.get("/product/:id", getProduct);
router.get("/products", getProducts);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
