import { NotFound, BadRequest } from "http-errors";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ForbiddenError } from "@casl/ability";
import {
  createUser,
  findAndUpdateUser,
  findUser,
  findUsers,
  deleteUser,
} from "./service";

export const createUserHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("create", "User");
  const body = req.body;
  const user = await createUser(body);
  res.status(201).send({ data: user });
};

export const updateUserHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("update", "User");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("User ID is not provided");
  }

  const user = await findUser({ _id: req.params.id });

  if (!user) {
    throw new NotFound("User is not found");
  }

  const updatedUser = await findAndUpdateUser({ _id: user._id }, req.body, {
    new: true,
  });
  return res.send(updatedUser);
};

export const getUsersHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", "User");
  const users = await findUsers({});
  res.send({ data: users });
};

export const getUserHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", "User");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("User ID is not provided");
  }

  const user = await findUser({ _id: req.params.id });

  if (!user) {
    throw new NotFound("User is not found");
  }

  res.send({ data: user });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("delete", "User");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("User ID is not provided");
  }

  const user = await findUser({ _id: req.params.id });

  if (!user) {
    throw new NotFound("User is not found");
  }

  await deleteUser({ _id: user._id });

  return res.sendStatus(200);
};
