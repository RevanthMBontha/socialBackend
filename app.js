import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import postRouter from "./routes/posts.routes.js";
import userRouter from "./routes/users.routes.js";

const app = express();
const PORT = process.env.port || 8080;

app.use(json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  return res.status(404).json({ error: "No such Route found!" });
});

export default app;
