import * as book from "./controller";
import express from "express";
const router = express.Router();

router.get("/book/", book.getBooksHandler);
router.get("/book/:id", book.getBookHandler);
router.patch("/book/:id", book.updateBookHandler);
router.patch("/borrowBook/:id", book.borrowBookHandler);
router.patch("/returnBook/:id", book.returnBookHandler);
router.delete("/book/:id", book.deleteBookHandler);
router.post("/book", book.createBookHandler);

export default router;
