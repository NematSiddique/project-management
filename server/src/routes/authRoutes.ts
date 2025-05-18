import express, { Request, Response, NextFunction } from "express";
import { login, signup } from "../controllers/authController";

const router = express.Router();

// Helper to wrap async route handlers and pass errors to next()
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(signup));

export default router;
