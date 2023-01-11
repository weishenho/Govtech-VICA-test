import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { accessibleRecordsPlugin } from "@casl/mongoose";
import "express-async-errors";
import cors from "cors";
import userRoutes from "./modules/users";
import auth from "./modules/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongoose.plugin(accessibleRecordsPlugin);
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/govtech");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});

const authRoutes = auth(app);
app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
