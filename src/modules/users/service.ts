import userModel, { IUser } from "./model";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export const findUsers = async (query: FilterQuery<IUser>) => {
  const users = await userModel.find(query).lean();
  return users;
};

export const findUser = async (query: FilterQuery<IUser>) => {
  return userModel.findOne(query).lean();
};

export const findAndUpdateUser = async (
  query: FilterQuery<IUser>,
  update: UpdateQuery<IUser>,
  options: QueryOptions
) => {
  return userModel.findOneAndUpdate(query, update, options);
};

export const createUser = async (
  input: DocumentDefinition<
    Omit<IUser, "createdAt" | "updatedAt" | "dateJoined">
  >
) => {
  return userModel.create(input);
};

export const deleteUser = async (query: FilterQuery<IUser>) => {
  return userModel.deleteOne(query);
};
