import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(cors(corsOptions))

app.use(express.json({ extended: false, limit: '3000kb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;