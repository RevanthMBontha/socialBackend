import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import postRouter from "./routes/posts.routes.js";

const app = express();
const PORT = process.env.port || 8080;

app.use(json());
app.use(morgan("dev"));
app.use(cors());

// Adding the createdAt time to the request when it is received by the server
app.use((req, res, next) => {
  req.createdAt = new Date();
  next();
});

app.use("/api/v1/posts", postRouter);

app.use("*", (req, res) => {
  return res.send("No such route found");
});

export default app;
