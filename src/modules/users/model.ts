import mongoose, { Schema } from "mongoose";

const roleTypes = ["admin", "editor", "member"] as const;
type role = (typeof roleTypes)[number];
export interface IUser {
  name: string;
  role: role;
  dateJoined: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: roleTypes,
      required: true,
    },
    dateJoined: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IUser>("User", userSchema);
