const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        rollNo:{
            type: String,
            unique: true,
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseDB",
            required: true
        },
        currentSemester: {
            type: Number,
            required: true,
            default: 1
        },
        semesters: [{
            subjects: [{
                subject: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'subjectDB'
                },
                attendance: {
                    present: { type: Number, default: 0, min: 0 },
                    total: { type: Number, default: 0, min: 0 },
                    percentage: { type: Number, default: 0, min: 0 }
                },
                marks: {
                    periodical: { type: Number, default: 0, min: 0 },
                    assessment: { type: Number, default: 0, min: 0 },
                    IA: { type: Number, default: 0, min: 0 },
                    SE: { type: Number, default: 0, min: 0 },
                    total: { type: Number, default: 0, min: 0 },
                },
                subjectPassed: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }],
            semesterPassed: {
                type: Boolean,
                required: true,
                default: false
            }
        }],
        coursePassed: {
            type: Boolean,
            required: true,
            default: false
        },
        coursePassedDate: {
            type: Date,
        },

        
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


// Method to upgrade the student to the next semester
studentSchema.methods.upgradeSemester = async function() {
    if (this.semesters[this.currentSemester - 1].semesterPassed) {
        // Increment current semester by 1
        this.currentSemester += 1;

        // Check if the course is completed
        if (this.currentSemester > this.semesters.length) {
            this.coursePassed = true;
        }

        // Save the changes
        await this.save();
    }
};

module.exports = mongoose.model("studentDB", studentSchema);