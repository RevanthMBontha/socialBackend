import {
  getPostsService,
  newPostService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
  likePostService,
  dislikePostService,
} from "./../services/posts.service.js";

export const getPosts = async (req, res) => {
  const posts = await getPostsService();
  return res.status(200).json({ posts });
};

export const newPost = async (req, res) => {
  const post = await newPostService();
  return res.status(200).json({ post });
};

export const getPostById = async (req, res) => {
  getPostByIdService();
  return res.status(200).json({ message: "Returned Post" });
};

export const updatePostById = async (req, res) => {
  updatePostByIdService();
  return res.status(200).json({ message: "Updated Post" });
};

export const deletePostById = async (req, res) => {
  const { postId } = req.params;
  await deletePostByIdService(postId);
  return res.status(204).json({});
};

export const likePost = async (req, res) => {
  likePostService();
  return res.status(200).json({ message: "Liked Post" });
};

export const dislikePost = async (req, res) => {
  dislikePostService();
  return res.status(200).json({ message: "Disliked Post" });
};
