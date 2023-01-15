import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import userRoutes from "../modules/users";
import bookRoutes from "../modules/books";
import auth from "../modules/auth";

function createServer() {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

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

  return app;
}

export default createServer;
