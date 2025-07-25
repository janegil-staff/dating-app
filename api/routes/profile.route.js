import express from "express";

import {
  createMatch,
  getMatches,
  profiles,
  receivedLikes,
  sendLike,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.route("/").get(profiles);
router.route("/create-match").post(createMatch);
router.route("/send-like").post(sendLike);
router.route("/received-likes/:userId/details").get(receivedLikes);
router.route("/:userId/matches").get(getMatches);


export default router;
