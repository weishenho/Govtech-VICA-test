import mongoose from "mongoose";
import { accessibleRecordsPlugin } from "@casl/mongoose";

async function connect() {
  try {
    mongoose.plugin(accessibleRecordsPlugin);
    mongoose.connect("mongodb://localhost:27017/govtech");

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected to MongoDB successfully");
    });
  } catch (error) {
    console.error("Could not connect to db", error);
    process.exit(1);
  }
}

export default connect;
