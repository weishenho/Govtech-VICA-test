import mongoose, { Schema } from "mongoose";

export interface IBook {
  title: string;
  description: string;
  genre: string;
  author: string;
  yearPublished: string;
  borrowed: boolean;
  lastBorrower: string;
  createdAt: Date;
  updatedAt: Date;
}

const Book = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    yearPublished: { type: String },
    borrowed: { type: Boolean },
    lastBorrower: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBook>("Book", Book);
