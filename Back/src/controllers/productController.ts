import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req: Request, res: Response) => {
  console.log("getProduct function called");
  console.log("getProduct route accessed");
  console.log("Request params:", req.params);
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, price, inventory, description } = req.body;
    if (
      !name ||
      !categoryId ||
      price === undefined ||
      inventory === undefined ||
      !description
    ) {
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

    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof categoryId !== "number" ||
      typeof price !== "number" ||
      typeof inventory !== "number"
    ) {
      return res
        .status(400)
        .json({ error: "Invalid data types for one or more fields" });
    }

    const createdProduct = await prisma.products.create({
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
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productId = req.params.id;

    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: productData,
    });

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const deleteProduct = await prisma.products.delete({
      where: { id: productId },
    });

    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product succesfully deleted" });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
