const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        duration: {
            type: Number,
            required: true,
        },
        semesters: [{
            subjects: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "subjectDB",
            }],
        }],
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "studentDB"
        }]
    },
    
    {timestamps: true}
);


module.exports = mongoose.model("courseDB", courseSchema);