import { login } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.route("/").post(login);

export default router;
