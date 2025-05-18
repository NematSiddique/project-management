import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // generate token using userId only
    const token = generateToken(user.userId);

    res.json({ message: "Login successful", token, user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password, profilePictureUrl = "i1.jpg", teamId = 1 } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePictureUrl,
        teamId,
      },
    });

    const token = generateToken(user.userId);
    res.status(201).json({ message: "User created", token, user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
