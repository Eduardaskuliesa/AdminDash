import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const getSaltRounds = (): number => {
  const envSaltRounds = process.env.BCRYPT_SALT_ROUNDS;
  return envSaltRounds ? parseInt(envSaltRounds, 10) : 12;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    console.log(name, password, email);
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, getSaltRounds());

    const newUser = await prisma.users.create({
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
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials pass" });
    }

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
