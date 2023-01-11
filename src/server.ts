import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { accessibleRecordsPlugin } from "@casl/mongoose";
import "express-async-errors";
import cors from "cors";
import userRoutes from "./modules/users";
import bookRoutes from "./modules/books";
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
app.use("/api", bookRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ForbiddenError") {
    res.status(403);
  } else {
    res.status(500);
  }
  res.send({ error: err.message || err });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
