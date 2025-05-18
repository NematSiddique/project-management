import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * GET /users - Get all users
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        profilePictureUrl: true,
        teamId: true,
      },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving users: ${error.message}` });
  }
};

/**
 * GET /users/:userId - Get single user by ID
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: Number(userId),
      },
      select: {
        userId: true,
        username: true,
        profilePictureUrl: true,
        teamId: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving user: ${error.message}` });
  }
};

/**
 * POST /users - Create new user
 */
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      password,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePictureUrl,
        teamId,
      },
      select: {
        userId: true,
        username: true,
        profilePictureUrl: true,
        teamId: true,
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};
