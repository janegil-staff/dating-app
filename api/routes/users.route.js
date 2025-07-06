import express from "express";

import {
  getUser,
  genderAndBirthdate,
  uploadImage,
  deleteImage
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:userId/gender").put(genderAndBirthdate);
router.route("/:userId/upload").post(uploadImage);
router.route("/:userId/delete").post(deleteImage);
router.route("/:userId").get(getUser);


export default router;