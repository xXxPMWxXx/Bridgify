const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const PostSchema = new Schema({
  author_email: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  // format DD/MM/YYYY
  description: {
    type: String,
    default: "No description"
  },
  activity_type: {
    type: String,
  },
  // photo path(http://13.229.138.25:8000/images/post/{fileName})
  // just need save the file name 
  // can be more than one
  postImages: {
    type: Array,
    default: [],
  },
  elderlyInvolved: {
    type: Array,
    default: [],
  },
  imagesCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", PostSchema, "Post");

// add this to advice cannot redeclare block-scoped variable error
export { }