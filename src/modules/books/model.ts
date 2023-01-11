import mongoose, { Schema } from "mongoose";

const Book = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    year_published: { type: String },
    isBorrowed: { type: String },
    last_borrower: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

Book.virtual("borrowedBy", {
  ref: "User",
  localField: "last_borrower",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model("Book", Book);
