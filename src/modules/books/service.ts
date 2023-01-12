import { NotFound, BadRequest } from "http-errors";
import { Request, Response } from "express";
import bookModel from "./model";
import { isValidObjectId } from "mongoose";
import { ForbiddenError } from "@casl/ability";

const findAll = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", bookModel.modelName);
  const books = await bookModel.find().populate("last_borrower");

  res.send({ data: books });
};

const find = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", bookModel.modelName);
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
  ForbiddenError.from(req.ability).throwUnlessCan(
    "create",
    bookModel.modelName
  );
  const book = new bookModel(req.body);

  await book.save();

  res.send({ data: book });
};

const update = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan(
    "update",
    bookModel.modelName,
    "*"
  );
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }
  const book = await bookModel.findById(req.params.id);
  if (!book) {
    throw new NotFound("Book is not found");
  }
  book.set(req.body);
  await book.save();

  res.send({ data: book });
};

const borrowBook = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan(
    "update",
    bookModel.modelName,
    "borrowed"
  );
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }
  const book = await bookModel.findById(req.params.id);

  if (!book) {
    throw new NotFound("Book is not found");
  }

  if (book.borrowed) {
    throw new BadRequest("Book is already borrowed");
  }
  if (!req.user) {
    throw new BadRequest("User not found");
  }

  book.set({ borrowed: req.body.borrowed, last_borrower: req.user?.id });
  await book.save();

  res.send({ data: book });
};

const returnBook = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan(
    "update",
    bookModel.modelName,
    "borrowed"
  );
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }
  const book = await bookModel.findOne({
    id: req.params.id,
    last_borrower: req.user?.id,
    borrowed: true,
  });

  if (!book) {
    throw new BadRequest(
      "You are not allowed to return this book, its either borrowed by another user, not borrowed or does not exist."
    );
  }

  book.set({ borrowed: false, last_borrower: undefined });
  await book.save();

  res.send({ data: book });
};

const destroy = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan(
    "delete",
    bookModel.modelName
  );

  const book = await bookModel.findById(req.params.id);

  if (!book) {
    throw new NotFound("Book is not found");
  }
  await book.remove();

  res.send({ data: book });
};

export { create, update, destroy, find, findAll, borrowBook, returnBook };
