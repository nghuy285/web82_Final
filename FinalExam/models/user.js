import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Customer"],
    default: "Customer",
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
