const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const NotificationSchema = new Schema({
    elderlyID: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Notification", NotificationSchema, "Notification");


// add this to advice cannot redeclare block-scoped variable error
export { }