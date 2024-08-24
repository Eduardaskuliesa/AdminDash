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
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalSales = yield prisma.orders.aggregate({
            _sum: {
                totalAmount: true,
            },
        });
        const totalOrders = yield prisma.orders.count();
        const totalUsers = yield prisma.users.count();
        const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0;
        const popularProducts = yield prisma.products.findMany({
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
        const recentSales = yield prisma.orders.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: true,
            },
        });
        const salesByCategory = yield prisma.categories.findMany({
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
    }
    catch (error) {
        console.error("Error retrieving dashboard metrics:", error);
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
