import Post from "../models/post.model.js";

export const getPostsService = async () => {
  return await Post.find();
};

export const newPostService = async () => {
  console.log("Adding New Post");
};

export const getPostByIdService = async (id) => {
  return await Post.findById(id);
};

export const updatePostByIdService = async () => {
  console.log("Updating specific Post");
};

export const deletePostByIdService = async (id) => {
  console.log("Deleting specific Post");
  return await Post.findByIdAndDelete(id);
};

export const likePostService = async () => {
  console.log("Liking Post");
};

export const dislikePostService = async () => {
  console.log("Disliking Post");
};
