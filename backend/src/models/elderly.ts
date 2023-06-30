const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const ElderlySchema = new Schema({
    // last 4 character of NRIC?
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    // format DD/MM/YYYY
    DOB: {
      type: String,
      required: true,
    },
    // photo path(http://13.229.138.25:8000/elderly/{fileName})
    // just need save the file name 
    photo: {
      type: String
    },
    // *** need to test this ***
    // {current_activity: lunch , 
    //  current_temp : 36.3 , 
    //  medication:{list of medications }, 
    //  condition:fine,   
    //  condition_description : ‘…..’ , 
    //  awake : True }
    status: {
        
    },
  });

module.exports = mongoose.model("Elderly", ElderlySchema, "Elderly");
// add this to advice cannot redeclare block-scoped variable error
export{}

