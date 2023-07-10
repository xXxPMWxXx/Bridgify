const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");



// const UserSchema = new mongoose.Schema({
//     username:{
//       type: String,
//       required: true,
//       unique: true,
//   },
//     password: String
//   })

// module.exports = mongoose.model("User", UserSchema, "User")

//Updated user schema with dateCreated attribute
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "default.png"
  },
  name: {
    type: String,
    required: true,
  },
  accRole: {
    type: String,
    default: "Child"
  },
  linkedElderly: {
    type: Array,
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

/**
 *  Here we are creating and setting an id property and 
    removing _id, __v, and the password hash which we do not need 
    to send back to the client.
 */
UserSchema.set("toJSON", {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});

/**
 * 1. The userSchema.plugin(uniqueValidator) method won’t let duplicate email id to be stored in the database.
 * 2. The unique: true property in email schema does the internal optimization to enhance the performance.
 */
UserSchema.plugin(uniqueValidator, { message: "Email already in use." });

// const User = mongoose.model("user", UserSchema, "Test_User");
const User = mongoose.model("user", UserSchema, "User");
module.exports = User;