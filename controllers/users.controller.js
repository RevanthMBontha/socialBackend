import {
  getUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  getUserPostsService,
} from "../services/users.service.js";

export const getUsers = (req, res) => {
  getUsersService();
  return res.status(200).json({ message: "Got all Users" });
};

export const createNewUser = (req, res) => {
  createNewUser();
  return res.status(200).json({ message: "Created new User" });
};

export const getUserById = (req, res) => {
  getUserByIdService();
  return res.status(200).json({ message: "Got specific User" });
};

export const updateUserById = (req, res) => {
  updateUserByIdService();
  return res.status(200).json({ message: "Updated specific User" });
};

export const deleteUserById = (req, res) => {
  deleteUserByIdService();
  return res.status(200).json({ message: "Deleted specific User" });
};

export const getUserPosts = (req, res) => {
  getUserPostsService();
  return res.status(200).json({ message: "Got all Posts by User" });
};
