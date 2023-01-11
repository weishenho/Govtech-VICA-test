import mongoose from "mongoose";
import { Request, Response } from "express";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";
import ability from "./abilities";

const create = async (req: Request, res: Response) => {
  const { name } = req.body || {};

  if (!name) {
    throw new BadRequest('Please specify "name" field in body');
  }

  const user = await mongoose.model("User").findOne({ name });

  // TODO: make async sign
  const token = jwt.sign({ id: user.id }, req.app.get("jwt.secret"), {
    issuer: req.app.get("jwt.issuer"),
    audience: req.app.get("jwt.audience"),
  });

  res.send({
    token,
    role: user.role,
    name: user.name,
    userId: user.id,
    rules: ability(user),
  });
};

export { create };
