import { Router } from "express";
import {
  createNewUser,
  deleteUserById,
  getUserPosts,
  getUsers,
  getUserById,
  updateUserById,
} from "../controllers/users.controller.js";
import { upload } from "../aws.js";

const router = Router();

router.route("/").get(getUsers).post(upload.array("files", 1), createNewUser);

router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route("/:userId/posts").get(getUserPosts);

export default router;
