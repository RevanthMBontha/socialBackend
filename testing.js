import express from "express";
import multer, { memoryStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config(); // Load environment variables from .env

// Initialize Express app
const app = express();
const port = 8081;

// Setup AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Setup Multer (use memoryStorage to handle file buffers directly)
const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB each
});

// Route to handle file uploads
app.post("/upload", upload.array("files", 10), async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  console.log("************Files are present:", files);

  try {
    // Prepare the file upload promises
    const fileUploads = files.map(async (file) => {
      const key = `uploads/${Date.now()}_${uuidv4()}`;
      console.log("***************key: ", key);

      console.log("************Trying to put the file in S3");

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      const data = await s3.send(command);
      console.log("*****************", data);
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    // Wait for all files to be uploaded and get their URLs
    const fileUrls = await Promise.all(fileUploads);

    // Send response with the file URLs
    res.status(200).json({
      message: "Files uploaded successfully",
      fileUrls: fileUrls,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Failed to upload files.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
