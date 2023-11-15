import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  status: {
    type: String,
    enum: ["selected", "brewed", "picked"],
    default: "picked",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
