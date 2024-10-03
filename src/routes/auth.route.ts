import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import { authController } from "../controllers";
import authValidation from "../validations/auth.validation";

const router = express.Router();

router.post("/login", yupValidate(authValidation.login), authController.login);
router.post("/logout", yupValidate(authValidation.logout), authController.logout);
router.post("/refresh-tokens", yupValidate(authValidation.refreshTokens), authController.refreshTokens);

export default router;