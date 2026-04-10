import express from "express";
import {
    registerUser,
    loginUser,
    adminLogin,
    getUserProfile
} from "../controllers/userControllers.js";
import authUser from "../middleware/auth.js";


const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);

export default userRouter;
