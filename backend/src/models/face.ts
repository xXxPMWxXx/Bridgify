import * as mongoose from "mongoose";

const faceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    descriptions: {
        type: Array,
        required: true,
    },
} );

// Mongoose#model(name, [schema], [collection], [skipInit])
module.exports = mongoose.model("Face", faceSchema, "Face");
