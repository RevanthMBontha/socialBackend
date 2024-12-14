import User from "../models/user.model.js";
import axios from "axios";

export const loginService = async (inUser) => {
  try {
    const userArray = await User.find({ email: inUser.email });
    const user = userArray[0];
    const isUser = !!user;
    if (isUser) {
      // Return the user
      return user;
    } else {
      // Get a random image from unsplash for background image
      console.log("Trying to get an unsplash image");
      const result = await axios.get(
        `https://api.unsplash.com/photos/random?query=nature&orientation=landscape`,
        {
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
          },
        }
      );

      const bgImage = result?.data?.urls?.small;

      // Create the user and return them
      const newUser = User.create({
        name: inUser.name,
        email: inUser.email,
        pfp: inUser.pfp,
        posts: [],
        bgImg: bgImage,
      });
      return newUser;
    }
  } catch (error) {
    console.log("Something went wrong in the Service");
  }
};
