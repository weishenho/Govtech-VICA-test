import mongoose from "mongoose";

const { Schema } = mongoose;
const User = new Schema(
  {
    name: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "member"],
      required: true,
    },
    date_joined: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", User);
