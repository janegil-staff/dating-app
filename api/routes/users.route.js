import express from "express";

import {
  genderAndBirthdate
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:userId/gender").put(genderAndBirthdate);

export default router;