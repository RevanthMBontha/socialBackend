import { Router } from "express";
import {
  getPosts,
  newPost,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/posts.controller.js";

const router = Router();

router.route("/").get(getPosts).post(newPost);

router
  .route("/:postId")
  .get(getPostById)
  .put(updatePostById)
  .delete(deletePostById);

export default router;
