import {
  getPostsService,
  newPostService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
} from "./../services/posts.service.js";

export const getPosts = async (req, res) => {
  getPostsService();
  return res.send("Returned all Posts");
};

export const newPost = async (req, res) => {
  newPostService();
  return res.send("Added new Post");
};

export const getPostById = async (req, res) => {
  getPostByIdService();
  return res.send("Returned Post");
};

export const updatePostById = async (req, res) => {
  updatePostByIdService();
  return res.send("Updated Post");
};

export const deletePostById = async (req, res) => {
  deletePostByIdService();
  return res.send("Deleted Post");
};
