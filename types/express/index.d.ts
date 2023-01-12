import { AnyMongoAbility } from "mongoose";
import { IUser } from "../../src/modules/users/model";
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
