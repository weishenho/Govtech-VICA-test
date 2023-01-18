import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "../modules/users/model";

let mongoServer: MongoMemoryServer | null = null;

export const connectedDB = async () => {
  const mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());

  await userModel.insertMany([
    { name: "admin1", role: "admin" },
    { name: "editor1", role: "editor" },
    { name: "member1", role: "member" },
  ]);
};

export const dropDB = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};
