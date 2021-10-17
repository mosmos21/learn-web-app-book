import { Schema } from "@app/schema";
import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { updateUserSettings } from "~/services/users/updateUserSettings";

export const settingsRouter = express.Router();

settingsRouter.patch<Record<string, unknown>, Schema.PatchSettings["response"], Schema.PatchSettings["requestBody"]>(
  "/settings",
  loginRequired(async (req, res, user) => {
    const { user: userParams } = req.body;
    await updateUserSettings({ updateParams: { id: user.id, ...userParams } });

    res.send({ user: { name: userParams.name } });
  }),
);
