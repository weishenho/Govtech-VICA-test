import * as users from "./service";
import express from "express";
const router = express.Router();

router.get("/users/", users.findAll);
router.get("/users/:id", users.find);
router.patch("/users/:id", users.update);
router.post("/users", users.create);

export default router;
