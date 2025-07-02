import express from "express";

import {
  register,
  login,
  verify
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify/:token").get(verify);

export default router;