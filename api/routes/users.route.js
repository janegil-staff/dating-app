import express from "express";

import {
  gender
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:userId/gender").put(gender);

export default router;