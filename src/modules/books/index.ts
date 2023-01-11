import * as book from "./service";
import express from "express";
const router = express.Router();

router.get("/book/", book.findAll);
router.get("/book/:id", book.find);
router.patch("/book/:id", book.update);
router.delete("/book/:id", book.destroy);
router.post("/book", book.create);

export default router;
