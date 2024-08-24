import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalSales = await prisma.orders.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const totalOrders = await prisma.orders.count();

    const totalUsers = await prisma.users.count();

    const conversionRate =
      totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0;

    const popularProducts = await prisma.products.findMany({
      take: 10,
      orderBy: {
        orderItems: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: { orderItems: true },
        },
      },
    });

    const recentSales = await prisma.orders.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    const salesByCategory = await prisma.categories.findMany({
      include: {
        products: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    const simplifiedSalesByCategory = salesByCategory.map((category) => {
      const totalSales = category.products.reduce((categoryTotal, product) => {
        const productTotal = product.orderItems.reduce((productTotal, item) => {
          return productTotal + Number(item.price) * item.quantity;
        }, 0);
        return categoryTotal + productTotal;
      }, 0);

      return {
        category: category.name,
        totalSales: Number(totalSales.toFixed(2)),
      };
    });

    res.json({
      totalSales: totalSales._sum.totalAmount || 0,
      totalOrders,
      totalUsers,
      conversionRate,
      salesByCategory: simplifiedSalesByCategory,
      popularProducts,
      recentSales,
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
