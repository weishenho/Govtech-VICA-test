const { kStringMaxLength } = require("buffer");
const mongoose = require("mongoose");

const { Schema } = mongoose;

module.exports = function () {
  const User = new Schema(
    {
      name: { type: String },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["admin", "editor", "member"] },
      date_joined: { type: Date },
    },
    {
      timestamps: true,
    }
  );

  User.method("isValidPassword", function isValidPassword(password) {
    return password === this.password;
  });

  return mongoose.model("User", User);
};
