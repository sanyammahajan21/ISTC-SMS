const pdfkit = require("pdfkit");
const fs = require("fs-extra");
const path = require("path");
const studentDB = require("../models/student.models");
const subjectDB = require("../models/subject.models");
const { ErrorResponse, SuccessResponse } = require("../utils/responses.utils");
const { asyncHandler } = require("../utils/handler.utils");




// ============================================== PROFILE CONTROLLERS ==============================================


exports.checkEditAllowed = asyncHandler(async (req, res) => {
    const studentId = req.user.userId;
    const student = await studentDB.findById(studentId);

    if (!student.profileEditAllowed) {
        return ErrorResponse(res, 400, "Profile edit is prohibited. Request admin to allow.", student.profileEditAllowed);
    }
        
    return SuccessResponse(res, "Success", student.profileEditAllowed);
});

exports.showProfile = asyncHandler(async (req, res) => {
    const studentId = req.user.userId;

    const student = await studentDB.findById(studentId);
    if (!student) {
        return ErrorResponse(res, 404, "Student does not exists");
    }

    student.course = undefined;
    student.semesters = undefined;
    student.profileEditAllowed = undefined;

    return SuccessResponse(res, "Success", student);
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const studentId = req.user.userId;

    const { contactNo, DOB, gender, fatherName, motherName, address, city, pinCode, state } = req.body;
    if (!contactNo || !DOB || !gender || !fatherName || !motherName || !address || !city || !pinCode || !state) {
        return ErrorResponse(res, 400, "Fill all the details");
    }

    const image = req.image;
    let uploadPath;
    if (image) {
        const extensions = ["jpeg", "jpg", "png"];
        const imageExt = image.originalname.split(".")[1].toLowerCase();
    
        if (!extensions.includes(imageExt)) {
            return ErrorResponse(res, 400, "File type not supported");
        }
    
        uploadPath = path.join(__dirname, `/../../public/profile/students/${contactNo}.${imageExt}`);
        fs.writeFileSync(uploadPath, fs.readFileSync(image.path));
        fs.unlinkSync(image.path);
    }


    await studentDB.findByIdAndUpdate(studentId, { image: uploadPath, contactNo, DOB, gender, fatherName, motherName, address, city, pinCode, state, profileEditAllowed: false, updatedAt: Date.now() });

    return SuccessResponse(res, "Details updated successfully");
});




// ============================================== RESULT CONTROLLERS ==============================================


exports.studentResult = asyncHandler(async (req, res) => {
    const studentId = req.user.userId;
    const { semesterNo } = req.body;

    const student = await studentDB.findById(studentId).populate('course');

    const doc = new pdfkit();
    const file = "result_card.pdf";

    doc.pipe(fs.createWriteStream(file));
    doc.fontSize(20).text(`Student Result Card`, { align: 'center' }).moveDown();

    // Student Details
    doc.fontSize(16).text(`Name: ${student.name}`).moveDown();
    doc.fontSize(16).text(`Roll No: ${student.rollNo}`).moveDown();
    doc.fontSize(16).text(`Date Of Birth: ${student.DOB}`).moveDown();
    doc.fontSize(16).text(`Gender: ${student.gender}`).moveDown();
    doc.fontSize(16).text(`Father's Name: ${student.fatherName}`).moveDown();
    doc.fontSize(16).text(`Mother's Name: ${student.motherName}`).moveDown();
    doc.fontSize(16).text(`Course: ${student.course.name}`).moveDown();
    doc.fontSize(16).text(`Semester: ${semesterNo}`).moveDown();

    const selectedSemester = student.semesters[semesterNo - 1];

    // Subject Details
    for (const subjectEntry of selectedSemester.subjects) {
        const subject = await subjectDB.findById(subjectEntry.subject);
        doc.fontSize(16).text(`Subject: ${subject.name}`);
        doc.fontSize(16).text(`Mid Semester Marks: ${subjectEntry.midSemMarks}`);
        doc.fontSize(16).text(`End Semester Marks: ${subjectEntry.fullSemMarks}`);
        doc.fontSize(16).text(`Total Marks: ${subjectEntry.totalMarks}`);
        doc.moveDown();
    }

    doc.end();

    return SuccessResponse(res, "Result downloaded successfully").download(file);
});


