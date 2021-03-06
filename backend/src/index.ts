import express from "express";
import session from "express-session";
import morgan from "morgan";
import { router } from "~/router";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    name: "_app",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use("/api/v1", router);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`listen on ${port}`);
});
