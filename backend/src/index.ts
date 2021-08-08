import express from "express";
import session from "express-session";
import { router } from "~/handlers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || "session_secret",
  name: "_app"
}));

app.use("/api/v1", router);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`listen on ${port}`);
});
