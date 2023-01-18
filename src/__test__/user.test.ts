import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/createServer";
import { connectedDB, dropDB } from "./setuptestdb";

const app = createServer();
const newUserInfo = {
  name: "member3",
  role: "member",
};

describe("user", () => {
  beforeAll(async () => {
    await connectedDB();
  });

  afterAll(async () => {
    await dropDB();
  });
  // user registration

  describe("create user session", () => {
    it("Should return a Token", async () => {
      const { statusCode, body, header } = await supertest(app)
        .post("/api/session")
        .send({ name: "admin1" });

      expect(statusCode).toBe(200);

      expect(body).toMatchObject({
        role: "admin",
        token: expect.any(String),
        userId: expect.any(String),
        name: "admin1",
      });
    });
  });

  describe("Admin", () => {
    let adminToken: string;

    let userRes: supertest.Response;

    beforeAll(async () => {
      const { body } = await supertest(app)
        .post("/api/session")
        .send({ name: "admin1" });
      adminToken = body.token;
      userRes = await supertest(app)
        .post("/api/users")
        .set("token", adminToken)
        .send(newUserInfo);
    });

    it("can read user", async () => {
      const { statusCode, body, header } = await supertest(app)
        .get(`/api/users/${userRes.body._id}`)
        .set("token", adminToken)
        .send();

      expect(statusCode).toBe(200);
      expect(body).toMatchObject(newUserInfo);
    });

    it("can read users", async () => {
      const { statusCode, body, header } = await supertest(app)
        .get(`/api/users`)
        .set("token", adminToken)
        .send();

      expect(statusCode).toBe(200);
      expect(body).toEqual(expect.any(Array));
    });

    it("can create user", async () => {
      const { statusCode, body, header } = await supertest(app)
        .post(`/api/users`)
        .set("token", adminToken)
        .send({ name: "member4", role: "member" });

      expect(statusCode).toBe(201);
      expect(body).toMatchObject({
        role: "member",
        name: "member4",
      });
    });

    it("can update user", async () => {
      const { statusCode, body, header } = await supertest(app)
        .patch(`/api/users/${userRes.body._id}`)
        .set("token", adminToken)
        .send({ name: "member3Changed" });

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        role: "member",
        name: "member3Changed",
      });
    });

    it("can delete user", async () => {
      const { statusCode, body, header } = await supertest(app)
        .delete(`/api/users/${userRes.body._id}`)
        .set("token", adminToken);

      expect(statusCode).toBe(200);
    });

    it("cannot delete non-existing user", async () => {
      const { statusCode, body, header } = await supertest(app)
        .delete(`/api/users/12323131`)
        .set("token", adminToken);

      expect(statusCode).toBe(500);
    });
  });
});
