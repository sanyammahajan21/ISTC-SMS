const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        type:{
            type: String,
            enum: ["THEORY", "PRACTICAL", "NULL"],
            required: true
        },
        IA: {
            type: Number,
            min: 0
        },
        SE: {
            type: Number,
            min: 0
        },
        total: {
            type: Number,
            min: 0
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("subjectDB", subjectSchema);
