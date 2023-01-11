import { NotFound } from "http-errors";
import { Request, Response } from "express";
import userModel from "./model";
import { isValidObjectId } from "mongoose";

const findAll = async (req: Request, res: Response) => {
  const users = await userModel.find({});

  res.send({ data: users });
};

const find = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("User is not found");
  }

  const user = await userModel.findById(req.params.id);

  if (!user) {
    throw new NotFound("User is not found");
  }

  res.send({ data: user });
};

const update = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("User is not found");
  }
  const user = await userModel.findById(req.params.id);

  if (!user) {
    throw new NotFound("User is not found");
  }

  const { role, ...body } = req.body;
  user.set(body);
  await user.save();

  res.send({ data: user });
};

const create = async (req: Request, res: Response) => {
  const user = new userModel(req.body);

  await user.save();

  res.status(201).send({ data: user });
};

export { findAll, find, update, create };
