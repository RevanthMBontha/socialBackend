import { loginService } from "../services/auth.services.js";

export const login = async (req, res) => {
  try {
    const user = req.body;
    const returnUser = await loginService(user);

    return res.status(200).json(returnUser);
  } catch (error) {
    console.log("Something went wrong in Controller");
  }
};
