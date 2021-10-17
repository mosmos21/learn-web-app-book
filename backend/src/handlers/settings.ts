import { Schema } from "@app/schema";
import express from "express";
import { loginRequired } from "~/handlers/loginRequired";

export const settingsRouter = express.Router();
