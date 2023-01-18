import { AnyMongoAbility } from "mongoose";
import { IUser } from "../../src/modules/users/model";
import "@types/jest";
declare global {
  namespace Express {
    interface Request {
      ability?: AnyMongoAbility;
    }
    interface User {
      id: string;
    }
  }
}
