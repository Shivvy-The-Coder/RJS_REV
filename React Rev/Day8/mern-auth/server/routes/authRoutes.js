import express from "express"
import { login, logout, register } from "../controllers/authController.js";

//create one router with name auth router 
const authRouter = express.Router();

authRouter.post("/register" , register);
authRouter.post("/login" , login);
authRouter.post("/logout" , logout);

// as defined in serverjs code , the function will be invoked through path /api/auth/register and so on

export default authRouter;