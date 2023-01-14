import * as users from "./controller";
import express from "express";
const router = express.Router();

router.get("/users/", users.getUsersHandler);
router.get("/users/:id", users.getUserHandler);
router.patch("/users/:id", users.updateUserHandler);
router.delete("/users/:id", users.deleteUserHandler);
router.post("/users", users.createUserHandler);

export default router;
