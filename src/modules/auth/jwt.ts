import { Strategy } from "passport-jwt";
import mongoose from "mongoose";
import { PassportStatic } from "passport";
import { Express, Request } from "express";

function findUser(payload: { id: string }, done: (a: any, b: boolean) => void) {
  const User = mongoose.model("User");

  User.findById(payload.id)
    .then((user) => (user ? done(null, user) : done(null, false)))
    .catch((error) => done(error, false));
}

function configurePassport(passport: PassportStatic, app: Express) {
  const options = {
    issuer: app.get("jwt.issuer"),
    audience: app.get("jwt.audience"),
  };

  passport.use(
    new Strategy(
      {
        ...options,
        secretOrKey: app.get("jwt.secret"),
        jwtFromRequest: (req: any) => req.headers.token,
      },
      findUser
    )
  );
}

export { configurePassport };
