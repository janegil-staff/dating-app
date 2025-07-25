import express from "express";

import {
  getUser,
  genderAndBirthdate,
  uploadImage,
  deleteImage,
  updateDescription,
  usersByGender,
  addTurnOns,
  removeTurnOns,
  lookingFor,
  lookingForRemove,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:userId/gender").put(genderAndBirthdate);
router.route("/:userId/description").put(updateDescription);
router.route("/:userId/upload").post(uploadImage);
router.route("/:userId/delete").post(deleteImage);
router.route("/:userId/turn-ons/add").put(addTurnOns);
router.route("/:userId/turn-ons/remove").put(removeTurnOns);
router.route("/:userId").get(getUser);
router.route("/:userId/looking-for").put(lookingFor);
router.route("/:userId/looking-for/remove").put(lookingForRemove);
router.route("/").get(usersByGender);

export default router;
