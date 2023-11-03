import express from "express";
import {
    getUser,
    getUserFollowing,
    addRemoveFollow,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
/*Read*/
router.get("/:id", verifyToken, getUser);
router.get("/:id/following", verifyToken, getUserFollowing);
/*UPDATE*/
router.patch("/:id/:FollowingId", verifyToken, addRemoveFollow);
export default router;