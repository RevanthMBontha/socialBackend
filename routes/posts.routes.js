import { Router } from "express";
import {
  getPosts,
  newPost,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/posts.controller.js";
import { upload } from "../aws.js";

const router = Router();

router.route("/").get(getPosts).post(upload.array("files", 10), newPost);

router
  .route("/:postId")
  .get(getPostById)
  .put(updatePostById)
  .delete(deletePostById);

export default router;
