import { timeStamp } from "console";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const ElderlySchema = new Schema({
    // last 4 character of NRIC
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    //frontend need to follow
    //format DD/MM/YYYY
    DOB: {
      type: String,
      required: true,
    },
    // photo path(http://13.229.138.25:8000/elderly/{fileName})
    // just need save the file name 
    photo: {
      type: String
    },
    // take in JSON object
    status: {

    },
    created: {
      type: Date,
      default: new Date().toString()

    }
  });

module.exports = mongoose.model("Elderly", ElderlySchema, "Elderly");
// add this to advice cannot redeclare block-scoped variable error
export{}

