const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const RecordSchema = new Schema({
    elderlyID: {
        type: String,
        required: true
    },
    //type : medical/medication/others
    type: {
        type: String,
        required: true,
        default: "other"
    },
    dateTime: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    document_no: {
        type: String
    },
    document_path: {
        type: String
    },
});

module.exports = mongoose.model("Record", RecordSchema, "Record");


// add this to advice cannot redeclare block-scoped variable error
export { }