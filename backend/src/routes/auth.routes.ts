import { Router } from "express";
import { body } from "express-validator";
import { connectAuthController } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/connect",
  [body("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/)],
  connectAuthController
);

export default router;

