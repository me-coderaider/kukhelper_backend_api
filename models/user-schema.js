const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true,
  },
  { versionKey: false },
  { _id: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
