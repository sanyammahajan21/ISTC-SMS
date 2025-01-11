const pdfkit = require("pdfkit");
const json2csv = require("json2csv").Parser;
const studentDB = require("../models/student.models");
const subjectDB = require("../models/subject.models");
const courseDB = require("../models/course.models");
const { ErrorResponse, SuccessResponse } = require("../utils/responses.utils");
const { asyncHandler } = require("../utils/handler.utils");
const { currentDate, requiredYear } = require("../utils/basic.utils");


const gradeFilter = (mark) => {

}

// ============================================== COMMON USED CONTROLLERS ==============================================


exports.getCourses = asyncHandler(async (req, res) => {
    const courses = await courseDB.find({}, "name duration");
        
    const coursesData = courses.map(course => ({
        name: course.name,
        duration: course.duration
    }));

    return SuccessResponse(res, "Success", coursesData);
});

exports.getSubjects = asyncHandler(async (req, res) => {    

    const course = req.query.course;
    const semester = req.query.semesterNo;

    const subjects = [];
    if (course) {
        const courseRes = await courseDB.findOne({ name: course }).populate({
            path: "semesters.subjects",
            select: "name"
        });

        if (!courseRes) {
            return ErrorResponse(res, 404, "Course does not exists");
        }

        if (semester) {
            const selectedSemester = courseRes.semesters[semester-1];
            selectedSemester.subjects.forEach(subject => {
                subjects.push(subject.name);
            });
        } else {
            courseRes.semesters.forEach(semester => {
                semester.subjects.forEach(subject => {
                    subjects.push(subject.name);
                });
            });
        }
    } else {
        const subjectData = await subjectDB.find({}, "name");
        subjectData.forEach(sub => subjects.push(sub.name));
    }

    return SuccessResponse(res, "Success", subjects);
});




// ============================================== ATTENDANCE CONTROLLERS ==============================================


exports.showAttendance = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const semester = req.query.semester;
    const subject = req.query.subject;
    const currentSemester = req.query.currentSemester;

    const subjectRes = await subjectDB.findOne({ name : subject });
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }

    const courseRes = await courseDB.findOne({ name : course });

    const students = await studentDB.find({ course : courseRes._id, currentSemester });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    const attendance = [];
    students.forEach(student => {
        const selectedSemester = student.semesters[semester-1];

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

exports.downloadAttendance = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const semester = req.query.semester;
    const subject = req.query.subject;
    const currentSemester = req.query.currentSemester;

    const attendance = [];

    const subjectRes = await subjectDB.findOne({ name : subject });
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }

    const courseRes = await courseDB.findOne({ name :  course });
    const students = await studentDB.find({ course : courseRes._id, currentSemester });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    students.forEach(student => {
        const selectedSemester = student.semesters[semester-1];

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));

        const { name, rollNo } = student;
        const present = subjectData.attendance.present;
        const total = subjectData.attendance.total;
        const percentage = subjectData.attendance.percentage;
        attendance.push({ name, rollNo, present, total, percentage});
    })

    const j2c = new json2csv();
    const csvData = j2c.parse(attendance);

    const courseTitle = course.replace(" ", "_");
    const subjectTitle = subject.replace(" ", "_");
    const fileName = `Attendance_${courseTitle}_Semester_${semester}_${subjectTitle}`
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attatchment: ${fileName}.csv`);

    res.status(200).end(csvData);
});




// ============================================== MARKS CONTROLLERS ==============================================


exports.showMarks = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const semester = req.query.semester;
    const subject = req.query.subject;
    const currentSemester = req.query.currentSemester;
  
    const courseRes = await courseDB.findOne({ name: course });
    const subjectRes = await subjectDB.findOne({ name : subject });
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject not found in teacher's subjects");
    }

    const students = await studentDB.find({ course: courseRes._id, currentSemester });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    const marks = [];
    const errors = [];

    students.forEach(student => {
        const semesterNo = student.semesters[semester-1];
        if (!semesterNo) {
            errors.push(`Student ${student.name} (Roll No: ${student.rollNo}) does not have semester number ${semester}`);
            return;
        }

        const subjectData = semesterNo.subjects.find(sub => String(sub.subject) === String(subjectRes._id));
        if (!subjectData) {
            errors.push(`Student ${student.name} (Roll No: ${student.rollNo}) does not study the subject ${subject}`);
            return;
        }

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
    if (errors.length > 0) {
        console.log(errors);
        return ErrorResponse(res, 400, "Issue in fetching the marks", marks);
    }

    // If no errors, send the success response
    return SuccessResponse(res, "Success", marks);
});


exports.downloadMarks = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const semester = req.query.semester;
    const subject = req.query.subject;
    const currentSemester = req.query.currentSemester;

    const marks = [];
    const subjectRes = await subjectDB.findOne({ name : subject });
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }

    const courseRes = await courseDB.findOne({ name :  course });
    const students = await studentDB.find({ course : courseRes._id, currentSemester });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified semester and subject");
    }

    students.forEach(student => {
        const selectedSemester = student.semesters[semester-1];

        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));

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

    const courseTitle = course.replace(" ", "_");
    const subjectTitle = subject.replace(" ", "_");
    const fileName = `Marks_${courseTitle}_Semester_${semester}_${subjectTitle}`
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attatchment: ${fileName}.csv`);

    res.status(200).end(csvData);
});

exports.enterOldMarks = asyncHandler(async (req, res) => {
    let marks = req.body;
    marks = Object.values(marks);
    
    const subject = req.query.subject;
    const subjectRes = await subjectDB.findOne({ name : subject });
    const semester = req.query.semester;

    for (const student of marks) {
        const rollNo = student.rollNo;

        const studentRes = await studentDB.findOne({ rollNo });

        const selectedSemester = studentRes.semesters[semester-1];
        const subjectData = selectedSemester.subjects.find(sub => String(sub.subject) === String(subjectRes._id));

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




// ============================================== DOCUMENTS CONTROLLERS ==============================================


exports.getStudentsForDMC = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const currentSemester = req.query.currentSemester;

    const courseRes = await courseDB.findOne({ name: course });

    const students = await studentDB.find({ course: courseRes._id, currentSemester });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No students found for the specified course");
    }

    const studentData = [];
    students.forEach(student => {
        studentData.push({
            name: student.name,
            rollNo: student.rollNo
        })
    });

    return SuccessResponse(res, "Success", studentData);
});


exports.getPassedStudents = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const courseRes = await courseDB.findOne({ name: course });
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const students = await studentDB.find({ course: courseRes._id });

    if (students.length === 0) {
        return ErrorResponse(res, 404, "No passed students found for the selected course");
    }

    const studentData = [];
    students.forEach(student => {
        studentData.push({
            name: student.name,
            rollNo: student.rollNo
        })
    });

    return SuccessResponse(res, "Success", studentData);
});

exports.downloadAdmitCard = asyncHandler(async (req, res) => {

});


exports.downloadDMC = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const rollNo = req.query.rollNo;
    const semester = req.query.semester;

    const student = await studentDB.findOne({ rollNo }).populate("course");

    if (!student) {
        return ErrorResponse(res, 404, "Student not found");
    }

    
    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=${rollNo}_DMC.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);


    // Add content to the PDF
    doc.fontSize(20).text(`${student.course.name}`, { align: 'center' }).moveDown();
    doc.fontSize(20).text(`Semester : ${semester}`, { align: 'center' }).moveDown();
    doc.fontSize(16).text(`Student Name: ${student.name}`, { align: 'center' }).moveDown();
    doc.fontSize(16).text(`Father's Name: ${student.fatherName}`, { align: 'center' }).moveDown();
    doc.fontSize(16).text(`Mother's Name: ${student.motherName}`, { align: 'center' }).moveDown();
    doc.fontSize(16).text(`Roll No: ${student.rollNo}`, { align: 'center' }).moveDown();

    const selectedSemester = student.semesters[semester - 1];
    
    let sr = 1;
    for (const subjectEntry of selectedSemester.subjects) {
        const horizontalSpace = '    '; 
        const subject = await subjectDB.findById(subjectEntry.subject);
        doc.fontSize(14).text(`${sr} `, { continued: true });
        doc.fontSize(14).text(`${subject.name}`, { continued: true });
        doc.fontSize(14).text(`${subjectEntry.marks.IA}/${subject.IA}${horizontalSpace}${subjectEntry.marks.total}/${subject.total}`, { align: "right"});

        // doc.fontSize(14).text(`${subjectEntry.marks.total}/${subject.total}`, { align: "right" });

        doc.moveDown();
        sr+=1;
    }

    doc.end();
});

exports.downloadMultipleDMCs = asyncHandler(async (req, res) => {
    const semester = req.query.semester;
    const rollNos = req.query.rollNos;

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=DMCs.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);

    for (const rollNo of rollNos) {
        const student = await studentDB.findOne({ rollNo }).populate("course");

        // Add content to the PDF
        doc.fontSize(20).text(`${student.course.name}`, { align: 'center' }).moveDown();
        doc.fontSize(20).text(`Semester : ${semester}`, { align: 'center' }).moveDown();
        doc.fontSize(16).text(`Student Name: ${student.name}`, { align: 'center' }).moveDown();
        doc.fontSize(16).text(`Father's Name: ${student.fatherName}`, { align: 'center' }).moveDown();
        doc.fontSize(16).text(`Mother's Name: ${student.motherName}`, { align: 'center' }).moveDown();
        doc.fontSize(16).text(`Roll No: ${student.rollNo}`, { align: 'center' }).moveDown();

        const selectedSemester = student.semesters[semester - 1];
        
        let sr = 1;
        for (const subjectEntry of selectedSemester.subjects) {
            const horizontalSpace = '    '; 
            const subject = await subjectDB.findById(subjectEntry.subject);
            doc.fontSize(14).text(`${sr} `, { continued: true });
            doc.fontSize(14).text(`${subject.name}`, { continued: true });
            doc.fontSize(14).text(`${subjectEntry.marks.IA}/${subject.IA}${horizontalSpace}${subjectEntry.marks.total}/${subject.total}`, { align: "right"});

            // doc.fontSize(14).text(`${subjectEntry.marks.total}/${subject.total}`, { align: "right" });

            doc.moveDown();
            sr+=1;
        }

        doc.addPage();
    }

    doc.end();
});

exports.downloadCC = asyncHandler(async (req, res) => {
    // const course = req.query.course;
    const rollNo = req.query.rollNo;

    const student = await studentDB.findOne({ rollNo }).populate("course");
    if (!student) {
        return ErrorResponse(res, 404, "Student does not exists");
    }

    // if (!student.coursePassed) {
    //     return ErrorResponse(res, 400, "Student has not passed the course");
    // }

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=${rollNo}_Character_Certificate.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);
    
    // Add content to the PDF
    doc.fontSize(18).moveDown(5);
    doc.fontSize(18).text(`No. Prin./Char/${student.rollNo}/ISTC`, { align: "left", continued: true });
    doc.fontSize(18).text(`Dated: ${currentDate()}`, { align: "right" }).moveDown();
    doc.fontSize(22).text(`CHARACTER CERTIFICATE`, { align: "center", underline: true }).moveDown();
    doc.fontSize(16).text(
        `This is to certify that ${student.name}, Roll No. ${student.rollNo}, S/D/o Sh. ${student.fatherName} was a bonafide student of this institute from August ${requiredYear(student.coursePassedDate) - student.course.duration} to July ${requiredYear(student.coursePassedDate)}.`
    ).moveDown();
    doc.fontSize(16).text(`To the best of my knowledge, he/she bears a good moral character.`, { align: "left" }).moveDown(3);
    doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();


    doc.end();
});

exports.downloadMultipleCCs = asyncHandler(async (req, res) => {
    const rollNos = req.query.rollNos;

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=Character_Certificates.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);

    for (const rollNo of rollNos) {
        const student = await studentDB.findOne({ rollNo }).populate("course");

        // Add content to the PDF
        doc.fontSize(18).moveDown(5);
        doc.fontSize(18).text(`No. Prin./Char/${student.rollNo}/ISTC`, { align: "left", continued: true });
        doc.fontSize(18).text(`Dated: ${currentDate()}`, { align: "right" }).moveDown();
        doc.fontSize(22).text(`CHARACTER CERTIFICATE`, { align: "center", underline: true }).moveDown();
        doc.fontSize(16).text(
            `This is to certify that ${student.name}, Roll No. ${student.rollNo}, S/D/o Sh. ${student.fatherName} was a bonafide student of this institute from August ${requiredYear(student.coursePassedDate) - student.course.duration} to July ${requiredYear(student.coursePassedDate)}.`
        ).moveDown();
        doc.fontSize(16).text(`To the best of my knowledge, he/she bears a good moral character.`, { align: "left" }).moveDown(3);
        doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();

        doc.addPage();
    }

    doc.end();
})

exports.downloadMC = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const rollNo = req.query.rollNo;

    const courseRes = await courseDB.findOne({ name : course });
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const student = await studentDB.findOne({ rollNo }).populate("course");
    if (!student) {
        return ErrorResponse(res, 404, "Student does not exists");
    }

    // if (!student.coursePassed) {
    //     return ErrorResponse(res, 400, "Student has not passed the course");
    // }

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=${rollNo}_Character_Certificate.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);
    
    // Add content to the PDF
    doc.fontSize(18).text(`No. Prin./Migr/${student.rollNo}/ISTC`, { align: "left", continued: true });
    doc.fontSize(18).text(`Dated: ${currentDate()}`, { align: "right" }).moveDown();
    doc.fontSize(22).text(`MIGRATION CERTIFICATE`, { align: "center", underline: true }).moveDown();
    doc.fontSize(16).text(
        `This is to certify that ${student.name}, Roll No. ${student.rollNo}, S/D/o Sh. ${student.fatherName} was a bonafide student of this institute from August ${requiredYear(student.coursePassedDate) - student.course.duration} to July ${requiredYear(student.coursePassedDate)}.`
    ).moveDown();
    doc.fontSize(16).text(`The institute has No Objection for his/her further studies from any recognized Board/Institute or University.`, { align: "left" }).moveDown(3);
    doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();


    doc.end();
});

exports.downloadMultipleMCs = asyncHandler(async (req, res) => {
    const rollNos = req.query.rollNos;

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=Migration_Certificates.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);

    for (const rollNo of rollNos) {
        const student = await studentDB.findOne({ rollNo }).populate("course");

        // Add content to the PDF
        doc.fontSize(18).moveDown(5);
        doc.fontSize(18).text(`No. Prin./Migr/${student.rollNo}/ISTC`, { align: "left", continued: true });
        doc.fontSize(18).text(`Dated: ${currentDate()}`, { align: "right" }).moveDown();
        doc.fontSize(22).text(`MIGRATION CERTIFICATE`, { align: "center", underline: true }).moveDown();
        doc.fontSize(16).text(
            `This is to certify that ${student.name}, Roll No. ${student.rollNo}, S/D/o Sh. ${student.fatherName} was a bonafide student of this institute from August ${requiredYear(student.coursePassedDate) - student.course.duration} to July ${requiredYear(student.coursePassedDate)}.`
        ).moveDown();
        doc.fontSize(16).text(`The institute has No Objection for his/her further studies from any recognized Board/Institute or University.`, { align: "left" }).moveDown(3);
        doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();

        doc.addPage();
    }

    doc.end();
});


exports.downloadTranscript = asyncHandler(async (req, res) => {
    const course = req.query.course;
    const rollNo = req.query.rollNo;

    const courseRes = await courseDB.findOne({ name : course });
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const student = await studentDB.findOne({ rollNo }).populate("course");
    if (!student) {
        return ErrorResponse(res, 404, "Student does not exists");
    }

    // Create a new PDF document
    const doc = new pdfkit();
    
    // Set the response headers for a PDF download
    res.setHeader("Content-Disposition", `attatchment; filename=${rollNo}_Transcript.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    
    doc.pipe(res);
    
    // Add content to the PDF
    doc.fontSize(18).moveDown(5);
    doc.fontSize(18).text(`Dated: ${currentDate()}`, { align: "left" }).moveDown();
    doc.fontSize(22).text(`TRANSCRIPT`, { align: "center" }).moveDown();
    doc.fontSize(16).text(
        `Certified that ${student.name}, Roll No. ${student.rollNo}, S/D/o Sh. ${student.fatherName} has been a bonafide student of this institute from August ${requiredYear(student.coursePassedDate) - student.course.duration} to July ${requiredYear(student.coursePassedDate)}. He successfully completed the course on "${courseRes.name}" (${courseRes.duration}-Years) in July ${requiredYear(student.coursePassedDate)} after passing all the eight semesters.`
    ).moveDown();
    doc.fontSize(16).text(`Following is the detail of the marks secured by him in the eight Semesters during his study at this institute.`).moveDown();
    doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();
    
    let ctr=1;
    for (const semester of student.semesters) {
        doc.fontSize(18).text(`${ctr}st Semester`).moveDown();
        ctr++;

        const tableTop = doc.y;
        const itemTop = tableTop + 20;

        doc.fontSize(14).text("Subject", 50, itemTop);
        doc.text("Marks", 300, itemTop);

        for (const subjectDetails of semester.subjects) {
            const y = doc.y + 10;
            doc.fontSize(12).text(subjectDetails.subject.name, 50, y);
            doc.text(`${subjectDetails.marks.total}/${subjectDetails.subject.total}`, 300, y);
            doc.moveDown();
        }

        
    }
    
    doc.fontSize(16).text(`This transcript is being issued to ${student.name} at his own request for higher education.`).moveDown();
    doc.fontSize(16).text(`(Registrar)`, { align: "left", continued: true });
    doc.fontSize(16).text(`(Principal)`, { align: "right" }).moveDown();
    doc.end();
});