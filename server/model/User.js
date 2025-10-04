import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // fixed typo
      unique: true,   // optional: prevent duplicate emails
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
