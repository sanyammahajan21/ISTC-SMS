const mongoose = require("mongoose");

const annSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            maxLength: 100,
        },
        content:{
            type: String,
            required: true,
            maxLength: 5000,
        },   
        url:{
            type: String,
        }, 
    },

    {timestamps: true}
);

module.exports = mongoose.model("annDB", annSchema);