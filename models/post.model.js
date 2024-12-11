import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    url: {
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
    description: {
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
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
