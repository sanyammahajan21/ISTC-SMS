const fs = require("fs-extra");
const path = require("path");
const json2csv = require("json2csv").Parser;
const courseDB = require("../models/course.models");
const studentDB = require("../models/student.models");
const teacherDB = require("../models/teacher.models");
const subjectDB = require("../models/subject.models");
const { asyncHandler } = require("../utils/handler.utils");
const { ErrorResponse, SuccessResponse } = require("../utils/responses.utils");




// ============================================== COMMON USED CONTROLLERS ==============================================


exports.getSubjects = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;
    
    const teacher = await teacherDB.findById(teacherId).populate({
        path: "subjects",
        populate: [
            { path: "course", select: "name" },
            { path: "subject", select: "name" } 
        ]
    });

    if (!teacher) {
        return ErrorResponse(res, 400, "Teacher does not exist");
    }

    const subjects = [];
    teacher.subjects.forEach(sub => {
        subjects.push({
            course: sub.course.name,
            semester: sub.semester,
            subject: sub.subject.name
        });
    })

    // console.log("subjects in teacher controllers --> ",subjects);
    return SuccessResponse(res, "Success", subjects);
});




// ============================================== PROFILE CONTROLLERS ==============================================


exports.checkEditAllowed = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);

    if (!teacher.profileEditAllowed) {
        return ErrorResponse(res, 401, "Profile edit is prohibited. Request admin to allow.", teacher.profileEditAllowed);
    }
        
    return SuccessResponse(res, "Edit approved", teacher.profileEditAllowed);
});

exports.showTeacherProfile = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);

    teacher.subjects = undefined;
    teacher.profileEditAllowed = undefined;

    return SuccessResponse(res, "Success", teacher);
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;

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
    
        uploadPath = path.join(__dirname, `/../../public/profile/teachers/${contactNo}.${imageExt}`);
        fs.writeFileSync(uploadPath, fs.readFileSync(image.path));
        fs.unlinkSync(image.path);
    }


    await teacherDB.findByIdAndUpdate(teacherId, { image: uploadPath, contactNo, DOB, gender, fatherName, motherName, address, city, pinCode, state, profileEditAllowed: false, updatedAt: Date.now() });

    return SuccessResponse(res, "Details updated successfully");
})




// ============================================== MARKS CONTROLLERS ==============================================


exports.showAttendance = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;
    const index = req.query.index;

    const teacher = await teacherDB.findById(teacherId);
    const subjectDataObject = teacher.subjects[index];
    
    const courseRes = await courseDB.findById(subjectDataObject.course);
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const subjectRes = await subjectDB.findById(subjectDataObject.subject);
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }

    const currentSemester = subjectDataObject.semester;
    const studentData = await studentDB.find({ course : courseRes._id });

    if (studentData.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    const attendance = [];
    studentData.forEach(student => {
        const selectedSemester = student.semesters[currentSemester-1];

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));

        attendance.push({
            name: student.name,
            rollNo: student.rollNo,
            present: subjectData.attendance.present,
            total: subjectData.attendance.total,
            percentage: subjectData.attendance.percentage
        });
    })

    return SuccessResponse(res, "success", attendance);
});

exports.enterAttendance = asyncHandler(async (req, res) => {
    let attendance = req.body;
    attendance = Object.values(attendance);

    const index = req.query.index;
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);

    const subjectDataObject = teacher.subjects[index];
    const semester = subjectDataObject.semester;

    for (const student of attendance) {
        const rollNo = student.rollNo;

        const studentRes = await studentDB.findOne({ rollNo });

        const selectedSemester = studentRes.semesters[semester-1];
        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectDataObject.subject));

        subjectData.attendance = {
            present : student.present || subjectData.marks.present,
            total : student.total || subjectData.marks.total,
            percentage : student.percentage || subjectData.marks.percentage,
        }

        await studentRes.save();
    }

    return SuccessResponse(res, "Attendance updated successfully");
});

exports.downloadAttendance = asyncHandler(async (req, res) => {
    const index = req.query.index;
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);
    const subjectDataObject = teacher.subjects[index];

    const currentSemester = subjectDataObject.semester;

    const attendance = [];
    const courseRes = await courseDB.findById(subjectDataObject.course);
    const students = await studentDB.find({ course : courseRes._id });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    students.forEach(student => {
        const selectedSemester = student.semesters[currentSemester-1];

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectDataObject.subject));

        const { name, rollNo } = student;
        const present = subjectData.attendance.present;
        const total = subjectData.attendance.total;
        const percentage = subjectData.attendance.percentage;
        attendance.push({ name, rollNo, present, total, percentage});
    })


    const j2c = new json2csv();
    const csvData = j2c.parse(attendance);


    const fileName = `Attendance`;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attatchment; filename=${fileName}.csv`);

    res.status(200).end(csvData);
});




// ============================================== MARKS CONTROLLERS ==============================================


exports.showMarks = asyncHandler(async (req, res) => {
    const teacherId = req.user.userId;
    const index = req.query.index;

    const teacher = await teacherDB.findById(teacherId);
    const subjectDataObject = teacher.subjects[index];
    
    const courseRes = await courseDB.findById(subjectDataObject.course);
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const subjectRes = await subjectDB.findById(subjectDataObject.subject);
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }

    const currentSemester = subjectDataObject.semester;
    const studentData = await studentDB.find({ course : courseRes._id });
    if (studentData.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    const marks = [];
    const errors = [];

    studentData.forEach(student => {
        const selectedSemester = student.semesters[currentSemester-1];
        // if (!selectedSemester) {
        //     errors.push(`Student ${student.name} (Roll No: ${student.rollNo}) does not have semester number ${semester}`);
        //     return;
        // }

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));
        // const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));
        // if (!subjectData) {
        //     errors.push(`Student ${student.name} (Roll No: ${student.rollNo}) does not study the subject ${subject}`);
        //     return;
        // }

        // Add student's marks to the response data
        marks.push({
            name: student.name,
            rollNo: student.rollNo,
            periodical: subjectData.marks.periodical,
            assessment: subjectData.marks.assessment,
            IA: subjectData.marks.IA,
            SE: subjectData.marks.SE,
            total: subjectData.marks.total,
        });
    });

    // Check if there are any errors
    // if (errors.length > 0) {
    //     console.log(errors);
    //     return ErrorResponse(res, 400, "Issue in fetching the marks", marks);
    // }

    // If no errors, send the success response
    return SuccessResponse(res, "Success", marks);
});


exports.enterMarks = asyncHandler(async (req, res) => {
    let marks = req.body;
    marks = Object.values(marks);
    
    const index = req.query.index;
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);

    const subjectDataObject = teacher.subjects[index];
    const semester = subjectDataObject.semester;

    for (const student of marks) {
        const rollNo = student.rollNo;

        const studentRes = await studentDB.findOne({ rollNo });

        const selectedSemester = studentRes.semesters[semester-1];
        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectDataObject.subject));

        subjectData.marks = {
            periodical: student.periodical || subjectData.marks.periodical,
            assessment: student.assessment || subjectData.marks.assessment,
            IA: parseInt(student.periodical) + parseInt(student.assessment) || subjectData.marks.IA,
            SE: student.SE || subjectData.marks.SE,
            total: parseInt(student.periodical) + parseInt(student.assessment) + parseInt(student.SE) || subjectData.marks.total,
        };

        await studentRes.save();
    }

    return SuccessResponse(res, "Marks updated successfully");
});


exports.downloadMarks = asyncHandler(async (req, res) => {
    const index = req.query.index;
    const teacherId = req.user.userId;
    const teacher = await teacherDB.findById(teacherId);
    const subjectDataObject = teacher.subjects[index];

    const currentSemester = subjectDataObject.semester;

    const marks = [];
    const courseRes = await courseDB.findById(subjectDataObject.course);
    const students = await studentDB.find({ course : courseRes._id });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    students.forEach(student => {
        const selectedSemester = student.semesters[currentSemester-1];

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectDataObject.subject));

        const { name, rollNo } = student;
        const periodical = subjectData.marks.periodical;
        const assessment = subjectData.marks.assessment;
        const IA = subjectData.marks.IA;
        const SE = subjectData.marks.SE;
        const total = subjectData.marks.total;
        marks.push({ name, rollNo, periodical, assessment, IA, SE, total});
    })

    const j2c = new json2csv();
    const csvData = j2c.parse(marks);

    const fileName = `Marks`;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attatchment: ${fileName}.csv`);

    res.status(200).end(csvData);
});