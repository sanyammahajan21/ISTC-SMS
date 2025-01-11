const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        subjects:[{
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courseDB"
            },
            semester: {
                type: Number,
            },
            subject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "subjectDB"
            }
        }],
        profileEditAllowed: {
            type: Boolean,
            required: true,
            default: true
        },
        image:{
            type: String,
        },
        contactNo:{
            type: Number,
        },
        DOB: {
            type: Date,
        },
        gender:{
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        fatherName:{
            type: String,
            trim: true,
        },
        motherName:{
            type: String,
            trim: true,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        pinCode: {
            type: Number,
        },
        state: {
            type: String,
        },
    },

    {timestamps: true}
);


module.exports = mongoose.model("teacherDB", teacherSchema);