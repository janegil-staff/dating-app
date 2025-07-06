import express from "express";

import {
  getUser,
  genderAndBirthdate,
  uploadImage,
  deleteImage,
  updateDescription
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:userId/gender").put(genderAndBirthdate);
router.route("/:userId/description").put(updateDescription);
router.route("/:userId/upload").post(uploadImage);
router.route("/:userId/delete").post(deleteImage);
router.route("/:userId").get(getUser);


export default router;