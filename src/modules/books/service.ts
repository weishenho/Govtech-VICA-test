import { NotFound } from "http-errors";
import { Request, Response } from "express";
import bookModel from "./model";
import { isValidObjectId } from "mongoose";

const findAll = async (req: Request, res: Response) => {
  const books = await bookModel.find({});

  res.send({ data: books });
};

const find = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }

  const book = await bookModel.findById(req.params.id);

  if (!book) {
    throw new NotFound("Book is not found");
  }

  res.send({ data: book });
};

const create = async (req: Request, res: Response) => {
  const book = new bookModel(req.body);

  await book.save();

  res.send({ item: book });
};

const update = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }
  const book = await bookModel.findById(req.params.id);
  if (!book) {
    throw new NotFound("Book is not found");
  }

  res.send({ item: book });
};

const destroy = async (req: Request, res: Response) => {
  const book = await bookModel.findById(req.params.id);

  if (book) {
    await book.remove();
  }

  res.send({ item: book });
};

export { create, update, destroy, find, findAll };
