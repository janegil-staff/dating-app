import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // or your Expo Web dev URL
    credentials: true,
  })
);

app.use(express.json({ extended: false, limit: "30000kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;
