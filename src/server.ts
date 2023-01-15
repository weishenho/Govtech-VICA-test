import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectDB from "./utils/connectDB";
import createServer from "./utils/createServer";

dotenv.config();

const port = process.env.PORT;

const app = createServer();

app.listen(port, async () => {
  console.info(`App is running at http://localhost:${port}`);

  await connectDB();
});
