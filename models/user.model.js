import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "I am using Vibesnap!",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    pfp: {
      type: String,
      trim: true,
      default: "",
    },
    bgImg: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
