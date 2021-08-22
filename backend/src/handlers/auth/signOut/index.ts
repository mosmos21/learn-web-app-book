import express from "express"
import { deleteHandler } from "~/handlers/auth/signOut/delete";
import { loginRequired } from "~/handlers/loginRequired";

export const signOutRouter = express.Router();

signOutRouter.delete("/auth/sign_out", loginRequired(deleteHandler));
