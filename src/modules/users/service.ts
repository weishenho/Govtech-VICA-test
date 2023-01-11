import { NotFound } from "http-errors";
import { Request, Response } from "express";
import userModel from "./model";
import { isValidObjectId } from "mongoose";
import { ForbiddenError } from "@casl/ability";

const findAll = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", userModel);
  const users = await userModel.find({});

  res.send({ data: users });
};

const find = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", userModel);

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
  ForbiddenError.from(req.ability).throwUnlessCan("update", userModel);

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
  ForbiddenError.from(req.ability).throwUnlessCan("create", userModel);

  const user = new userModel(req.body);

  await user.save();

  res.status(201).send({ data: user });
};

const destroy = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("delete", userModel);

  const user = await userModel.findById(req.params.id);

  if (user) {
    await user.remove();
  }

  res.send({ item: user });
};

export { findAll, find, update, create, destroy };
