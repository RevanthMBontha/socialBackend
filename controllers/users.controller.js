import User from "../models/user.model.js";
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

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  return res.status(200).json(user);
};

export const updateUserById = (req, res) => {
  updateUserByIdService();
  return res.status(200).json({ message: "Updated specific User" });
};

export const deleteUserById = (req, res) => {
  deleteUserByIdService();
  return res.status(200).json({ message: "Deleted specific User" });
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const thisUser = await User.findById(userId).populate("posts");
    console.log(thisUser);
    return res.status(200).json(thisUser.posts);
  } catch (error) {
    return res.send(error);
  }
};
