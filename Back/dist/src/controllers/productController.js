"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getProduct function called");
    console.log("getProduct route accessed");
    console.log("Request params:", req.params);
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        const product = yield prisma.products.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.products.findMany();
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryId, price, inventory, description } = req.body;
        if (!name ||
            !categoryId ||
            price === undefined ||
            inventory === undefined ||
            !description) {
            return res.status(400).json({
                error: "Missing required fields",
                requiredFields: {
                    name: name ? "✓" : "✗",
                    categoryId: categoryId ? "✓" : "✗",
                    price: price !== undefined ? "✓" : "✗",
                    inventory: inventory !== undefined ? "✓" : "✗",
                    description: description ? "✓" : "✗",
                },
            });
        }
        if (typeof name !== "string" ||
            typeof description !== "string" ||
            typeof categoryId !== "number" ||
            typeof price !== "number" ||
            typeof inventory !== "number") {
            return res
                .status(400)
                .json({ error: "Invalid data types for one or more fields" });
        }
        const createdProduct = yield prisma.products.create({
            data: {
                name,
                categoryId,
                price,
                inventory,
                description,
            },
        });
        res.status(201).json({
            message: "Product successfully created",
            product: createdProduct,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productId = req.params.id;
        const updatedProduct = yield prisma.products.update({
            where: { id: productId },
            data: productData,
        });
        res.status(200).json({ message: "Product updated", updatedProduct });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        const deleteProduct = yield prisma.products.delete({
            where: { id: productId },
        });
        if (!deleteProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product succesfully deleted" });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
