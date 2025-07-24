import express from "express";
import { body } from "express-validator";
import { subscribeUser } from "../controllers/subscribeController.ts";
import { confirmEmail } from "../controllers/confirmController.ts";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import subscribeRateLimiter from "../middleware/ratelimiterMiddleware.ts";
const router = express.Router();

// @route   POST /api/newsletter/subscribers
// @desc    Send confirmation email
router.post(
  "/subscribers",
  subscribeRateLimiter,
  body("email").isEmail().withMessage("Invalid email format"),
  validationMiddleware,
  subscribeUser
);

// @route   GET /api/newsletter/subscribers/confirm?token=...
// @desc    Confirm email and store in MongoDB
router.get("/subscribers/confirm", confirmEmail);
export default router;
