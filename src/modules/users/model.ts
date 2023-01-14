import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  role: string;
  dateJoined: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "member"],
      required: true,
    },
    dateJoined: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IUser>("User", userSchema);
