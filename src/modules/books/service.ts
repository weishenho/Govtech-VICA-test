import bookModel, { IBook } from "./model";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export const findBooks = async (query: FilterQuery<IBook>) => {
  const users = await bookModel.find(query).lean();
  return users;
};

export const findBook = async (query: FilterQuery<IBook>) => {
  return bookModel.findOne(query).lean();
};

export const findAndUpdateBook = async (
  query: FilterQuery<IBook>,
  update: UpdateQuery<IBook>,
  options: QueryOptions
) => {
  return bookModel.findOneAndUpdate(query, update, options);
};

export const createBook = async (
  input: DocumentDefinition<
    Omit<IBook, "createdAt" | "updatedAt" | "dateJoined">
  >
) => {
  return bookModel.create(input);
};

export const deleteBook = async (query: FilterQuery<IBook>) => {
  return bookModel.deleteOne(query);
};
