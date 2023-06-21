import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
      type: String,
      required: true,
      unique: true,
  },
    password: String
  })

module.exports = mongoose.model("User", UserSchema, "User")