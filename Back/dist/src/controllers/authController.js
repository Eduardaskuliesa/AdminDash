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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getSaltRounds = () => {
    const envSaltRounds = process.env.BCRYPT_SALT_ROUNDS;
    return envSaltRounds ? parseInt(envSaltRounds, 10) : 12;
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email } = req.body;
        console.log(name, password, email);
        const existingUser = yield prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, getSaltRounds());
        const newUser = yield prisma.users.create({
            data: {
                userId: Math.random().toString(36).substr(2, 9),
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log(newUser);
        res.status(201).json({
            message: "User registered successfully",
            userId: newUser.userId,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Logged in successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }
});
exports.login = login;
