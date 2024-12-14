import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    urls: {
      type: [String],
      validate: {
        validator: function (el) {
          return (
            Array.isArray(el) && el.every((link) => typeof link === "string")
          );
        },
        message: "Tags must be an array of strings.",
      },
    },
    caption: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
