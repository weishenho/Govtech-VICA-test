import passport from "passport";
import { configurePassport } from "./jwt";
import * as session from "./service";
import { Express, Router } from "express";

export default (app: Express) => {
  const router = Router();
  router.post("/session", session.create);

  const secret = "supersecret";

  app.set("jwt.secret", secret);
  app.set("jwt.issuer", "CASL.Express");
  app.set("jwt.audience", "casl.io");
  configurePassport(passport, app);
  router.use(passport.initialize());
  router.use(
    passport.authenticate("jwt", { session: false, failWithError: true })
  );
  return router;
};
