import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;
