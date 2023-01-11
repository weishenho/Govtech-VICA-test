import { AnyMongoAbility } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      ability?: AnyMongoAbility;
    }
  }
}
