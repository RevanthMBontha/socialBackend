import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Post from "../models/post.model.js";
import { config } from "dotenv";
import User from "../models/user.model.js";

config(); // Load environment variables from .env

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("createdBy");
  return res.status(200).json({ posts });
};

export const newPost = async (req, res) => {
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);
  try {
    // Get the details of the uploaded photos
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    // Get the other details from the body
    const { caption, userID } = req.body;

    // Upload files to AWS S3 bucket
    let fileURLs;
    // Prepare the file upload promises
    const fileUploads = files.map(async (file) => {
      const key = `uploads/${Date.now()}_${uuidv4()}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      console.log("********* Trying to send data to S3 bucket");
      const data = await s3.send(command);
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    // Wait for all files to be uploaded and get their URLs
    fileURLs = await Promise.all(fileUploads);
    console.log("************ Received data from S3: ", fileURLs);

    // Create the post and save it
    const newPost = await Post.create({
      urls: fileURLs,
      caption: caption,
      createdBy: userID,
    });

    const test = await User.findByIdAndUpdate(
      userID,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    // Return the data
    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Failed to upload files.");
  }
};

export const getPostById = async (req, res) => {
  return res.status(200).json({ message: "Returned Post" });
};

export const updatePostById = async (req, res) => {
  return res.status(200).json({ message: "Updated Post" });
};

export const deletePostById = async (req, res) => {
  const { postId } = req.params;
  return res.status(204).json({});
};

export const likePost = async (req, res) => {
  return res.status(200).json({ message: "Liked Post" });
};

export const dislikePost = async (req, res) => {
  return res.status(200).json({ message: "Disliked Post" });
};
