import { NotFound, BadRequest } from "http-errors";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ForbiddenError } from "@casl/ability";
import {
  findBooks,
  findBook,
  findAndUpdateBook,
  deleteBook,
  createBook,
} from "./service";

export const createBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("create", "Book");
  const body = req.body;
  const book = await createBook(body);
  res.status(201).send(book);
};

export const updateBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("update", "Book");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("Book ID is not provided");
  }

  const book = await findBook({ _id: req.params.id });

  if (!book) {
    throw new NotFound("Book is not found");
  }

  const updatedBook = await findAndUpdateBook({ _id: book._id }, req.body, {
    new: true,
  });
  return res.send(updatedBook);
};

export const getBooksHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", "Book");
  const books = await findBooks({});
  res.send(books);
};

export const getBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("read", "Book");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("Book ID is not provided");
  }

  const book = await findBook({ _id: req.params.id });

  if (!book) {
    throw new NotFound("Book is not found");
  }

  res.send(book);
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("delete", "Book");

  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("Book ID is not provided");
  }

  const book = await findBook({ _id: req.params.id });

  if (!book) {
    throw new NotFound("Book is not found");
  }

  await deleteBook({ _id: book._id });

  return res.sendStatus(200);
};

export const borrowBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("update", "Book", "borrowed");
  if (!isValidObjectId(req.params.id)) {
    throw new BadRequest("Book ID is not provided");
  }
  if (!req.user) {
    throw new BadRequest("User not found");
  }
  const book = await findBook({ _id: req.params.id });

  if (!book) {
    throw new NotFound("Book is not found");
  }

  if (book.borrowed) {
    throw new BadRequest("Book is already borrowed");
  }

  const updatedBook = await findAndUpdateBook(
    { _id: book._id },
    { borrowed: true, last_borrower: req.user?.id },
    {
      new: true,
    }
  );
  res.send(updatedBook);
};

export const returnBookHandler = async (req: Request, res: Response) => {
  ForbiddenError.from(req.ability).throwUnlessCan("update", "Book", "borrowed");
  if (!isValidObjectId(req.params.id)) {
    throw new NotFound("Book is not found");
  }
  const book = await findBook({
    _id: req.params.id,
    last_borrower: req.user?.id,
    borrowed: true,
  });

  if (!book) {
    throw new BadRequest(
      "You are not allowed to return this book, its either borrowed by another user, not borrowed or does not exist."
    );
  }

  const updatedBook = await findAndUpdateBook(
    { _id: book._id },
    { borrowed: false, last_borrower: undefined },
    {
      new: true,
    }
  );

  res.send(updatedBook);
};
