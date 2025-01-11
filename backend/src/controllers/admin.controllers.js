const fs = require("fs-extra");
const csvtojson = require("csvtojson");
const userDB = require("../models/user.models");
const courseDB = require("../models/course.models");
const studentDB = require("../models/student.models");
const subjectDB = require("../models/subject.models");
const teacherDB = require("../models/teacher.models");
const { SuccessResponse, ErrorResponse } = require("../utils/responses.utils");
const { asyncHandler } = require("../utils/handler.utils");




// ============================================== ADD USER CONTROLLERS ==============================================


exports.addUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return ErrorResponse(res, 400, "Fill all the details");
    }

    const user = await userDB.findOne({ email });
    if (user) {
        return ErrorResponse(res, 400, `User already exists with the email : ${email}`);
    }

    await userDB.create({ email, password, role });

    return SuccessResponse(res, "User added successfully");
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const { email, role } = req.body;

    const user = await userDB.findOne({ email, role });
    if (!user) {
        return ErrorResponse(res, 404, `User does not exists with the email : ${email}`);
    }

    await userDB.deleteOne({ email });

    return SuccessResponse(res, "User deleted successfully");
});




// ============================================== COURSE CONTROLLERS ==============================================


const semesters_6 = [
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
];

const semesters_8 = [
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
    { subjects: [] },
];


exports.addCourse = asyncHandler(async (req, res) => {
    const { name, duration } = req.body;

    const courseExists = await courseDB.findOne({ name });
    if (courseExists) {
        return ErrorResponse(res, 400, "Course already exists");
    }

    let semesters = duration == 3 ? semesters_6 : semesters_8;
    const course = await courseDB.create({ name, duration, semesters });

    return SuccessResponse(res, "Course added successfully", course);
});


exports.getCourses = asyncHandler(async (req, res) => {
    const courses = await courseDB.find({}, "name duration");
        
    const coursesData = courses.map(course => ({
        name: course.name,
        duration: course.duration
    }));

    return SuccessResponse(res, "Success", coursesData);
});


exports.deleteCourse = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const courseExists = await courseDB.findOne({ name });
    if (!courseExists) {
        return ErrorResponse(res, 400, "Course does not exist");
    }

    await courseDB.findOneAndDelete({ name });

    return SuccessResponse(res, "Course deleted successfully");

});


exports.fillSemestersArray = asyncHandler(async (req, res) => {
    if (!req.file) {
        return ErrorResponse(res, 400, "No file selected");
    }

    const csvData = await csvtojson().fromFile(req.file.path);
    const { course1, course2, course3, course4 } = req.body;

    const courseRes1_1 = await courseDB.findOne({ name: course1 });
    const courseRes1_2 = await courseDB.findOne({ name: course2 });
    const courseRes2_1 = await courseDB.findOne({ name: course3 });
    const courseRes2_2 = await courseDB.findOne({ name: course4 });

    if (!courseRes1_1 || !courseRes1_2 || !courseRes2_1 || !courseRes2_2) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    let completeAdded = true;
    const nonExistingSubjects = [];
    const emptySemesterField = [];
    for (const row of csvData) {
        const subjectExists = await subjectDB.findOne({ name: row.name });

        if (!subjectExists) {
            completeAdded = false;
            nonExistingSubjects.push(row.name, " : subject does not exists");
            continue;
        }

        const semester = row.semester;
        if (!semester) {
            completeAdded = false;
            emptySemesterField.push("Semester field is empty for the subject : ", row.name);
            continue;
        }

        if (semester >= 7) {
            if (row.dept == 1) {
                courseRes1_2.semesters[semester - 1].subjects.push(subjectExists._id);
            } else if (row.dept == 2) {
                courseRes2_2.semesters[semester - 1].subjects.push(subjectExists._id);
            }
        } else if (semester >= 3) {
            if (row.dept == 1) {
                courseRes1_1.semesters[semester - 1].subjects.push(subjectExists._id);
                courseRes1_2.semesters[semester - 1].subjects.push(subjectExists._id);
            } else if (row.dept == 2) {
                courseRes2_1.semesters[semester - 1].subjects.push(subjectExists._id);
                courseRes2_2.semesters[semester - 1].subjects.push(subjectExists._id);
            }
        } else if (semester >= 1) {
            courseRes1_1.semesters[semester - 1].subjects.push(subjectExists._id);
            courseRes1_2.semesters[semester - 1].subjects.push(subjectExists._id);
            courseRes2_1.semesters[semester - 1].subjects.push(subjectExists._id);
            courseRes2_2.semesters[semester - 1].subjects.push(subjectExists._id);
        }
    }

    await courseRes1_1.save();
    await courseRes1_2.save();
    await courseRes2_1.save();
    await courseRes2_2.save();

    if (completeAdded) {
        return SuccessResponse(res, "Semesters array filled successfully");
    } else {
        const data = {
            emptySemesterField: emptySemesterField,
            nonExistingSubjects: nonExistingSubjects
        }
        return ErrorResponse(res, 400, "Incomplete semesters array fill", data);
    }
});


exports.clearSemestersArray = asyncHandler(async (req, res) => {
    const { course } = req.body;
    const courseExists = await courseDB.findOne({ name: course });

    if (!courseExists) {
        return ErrorResponse(res, 404, "Course does not exist");
    }

    courseExists.semesters = courseExists.duration == 3 ? semesters_6 : semesters_8;
    await courseExists.save();

    return SuccessResponse(res, "Semesters array cleared successfully");
});




// ============================================== SUBJECT CONTROLLERS ==============================================


exports.addSingleSubject = asyncHandler(async (req, res) => {
    const { name, type, IA, SE, total } = req.body;

    const subjectExists = await subjectDB.findOne({ name });
    if (subjectExists) {
        return ErrorResponse(res, 400, "Subject already exists");
    }

    await subjectDB.create({ name, type, IA, SE, total });

    return SuccessResponse(res, "Subject created successfully");
});


exports.getSubjects = asyncHandler(async (req, res) => {

    const course = req.query.course;
    const semester = req.query.semester;
    const teacherEmail = req.query.teacher;

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
    } else if (teacherEmail) {
        const teacherRes = await teacherDB.findOne({ email: teacherEmail }).populate({
            path: "subjects",
            populate: [
                { path: "course", select: "name" },
                { path: "subject", select: "name" } 
            ]
        });
        
        if (!teacherRes) {
            return ErrorResponse(res, 404, "Teacher does not exists");
        }

        teacherRes.subjects.forEach(sub => {
            subjects.push({
                course: sub.course.name,
                semester: sub.semester,
                subject: sub.subject.name
            });
        })
    } else {
        const subjectData = await subjectDB.find({}, "name");
        subjectData.forEach(sub => subjects.push(sub.name));
    }

    return SuccessResponse(res, "Success", subjects);
});


exports.deleteSubject = asyncHandler(async (req, res) => {
    const { subject } = req.body;

    const subjectRes = await subjectDB.findOne({ name: subject });
    if (!subjectRes) {
        return ErrorResponse(res, 400, `Selected subject does not exist`);
    }

    await subjectDB.findOneAndDelete({ name: subject });

    return SuccessResponse(res, "Subject deleted successfully");
});


exports.addMultipleSubjects = asyncHandler(async (req, res) => {
    if (!req.file) {
        return ErrorResponse(res, 400, "No file selected");
    }

    const csvData = await csvtojson().fromFile(req.file.path);

    let completeAdded = true;
    const existingSubjects = [];
    for (const row of csvData) {
        const subjectExists = await subjectDB.findOne({ name: row.name });

        if (subjectExists) {
            completeAdded = false;
            existingSubjects.push(row.name, " subject already exists");
            continue;
        }

        await subjectDB.create({
            name: row.name,
            type: row.type,
            IA: row.IA,
            SE: row.SE,
            total: row.total,
        });
    }

    if (completeAdded) {
        return SuccessResponse(res, "Subjects added successfully");
    } else {
        return ErrorResponse(res, 400, "Incomplete subject entry creation", existingSubjects);
    }
});




// ============================================== TEACHER CONTROLLERS ==============================================


exports.addTeacher = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const teacherExists = await teacherDB.findOne({ email });
    const userExists = await userDB.findOne({ email });
    if (teacherExists && userExists) {
        return ErrorResponse(res, 400, `Teacher already exists with the email ${email}`);
    }

    // const password = email.split("@")[0].toLowerCase();
    const teacher = await teacherDB.create({ name, email });
    await userDB.create({ email, password, role: "teacher", userId: teacher._id });

    teacher.password = undefined;
    return SuccessResponse(res, "Teacher added successfully", teacher);
});


exports.deleteTeacher = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const teacherExists = await teacherDB.findOne({ email });

    if (!teacherExists) {
        return ErrorResponse(res, 404, `Teacher does not exist with the email : ${email}`);
    }

    await userDB.deleteOne({ userId: teacherExists._id });
    await teacherDB.deleteOne({ email });

    return SuccessResponse(res, "Teacher deleted successfully");
});


exports.allotSubjectToTeacher = asyncHandler(async (req, res) => {
    const { course, semester, subject, email } = req.body;

    const teacher = await teacherDB.findOne({ email });
    if (!teacher) {
        return ErrorResponse(res, 404, "Teacher does not exists");
    }

    const courseRes = await courseDB.findOne({ name : course });
    if (!courseRes) {
        return ErrorResponse(res, 404, "Course does not exists");
    }

    const subjectRes = await subjectDB.findOne({ name: subject });
    if (!subjectRes) {
        return ErrorResponse(res, 404, "Subject does not exists");
    }
    
    const alreadyAllotted = teacher.subjects.some(sub => {
        return sub.course.toString() === courseRes._id.toString() &&
        sub.semester === semester &&
        sub.subject.toString() === subjectRes._id.toString();
    });
    
    console.log('alreadyAllotted:', alreadyAllotted);


    if (alreadyAllotted) {
        return ErrorResponse(res, 400, "Subject is already allotted to the teacher");
    }

    teacher.subjects.push({
        course: courseRes._id,
        semester: semester,
        subject: subjectRes._id
    })

    await teacher.save();

    return SuccessResponse(res, "Subject allotted");
});


exports.removeSubjectFromTeacher = asyncHandler(async (req, res) => {

    const {email, subjectIndex} = req.body;

    // Find the teacher based on the email
    const teacher = await teacherDB.findOne({ email });
    if (!teacher) {
        return ErrorResponse(res, 404, "Teacher does not exist");
    }

    if (subjectIndex > -1) {
        // Remove the subject assignment from the teacher's subjects array
        teacher.subjects.splice(subjectIndex, 1);

        // Save the teacher's updated document
        await teacher.save();

        return SuccessResponse(res, "Subject removed from teacher");
    } else {
        return ErrorResponse(res, 404, "Subject not assigned to the teacher");
    }
});




// ============================================== STUDENT CONTROLLERS ==============================================


const attendance = {
    present: 0,
    total: 0,
    percentage: 0,
};

const marks = {
    periodical: 0,
    assessment: 0,
    IA: 0,
    SE: 0,
    total: 0,
};


exports.addSingleStudent = asyncHandler(async (req, res) => {
    const { name, rollNo, email, password, course } = req.body;

    const studentRes = await studentDB.findOne({ rollNo: rollNo });
    if (studentRes) {
        return ErrorResponse(res, 400, `Student already exists with the roll no. ${rollNo}`);
    }

    const courseRes = await courseDB.findOne({ name: course });
    if (!courseRes) {
        return ErrorResponse(res, 404, `${course} does not exists`);
    }

    const semesters = courseRes.semesters.map(semester => ({
        subjects: semester.subjects.map(subjectId => ({
            subject: subjectId,
            attendance: { ...attendance },
            marks: { ...marks },
        })),
    }));

    const student = await studentDB.create({ name, rollNo, email, course: courseRes._id, semesters, currentSemester: 1 });

    await courseDB.updateOne({ name: course }, { $push: { students: student._id } });

    await userDB.create({ email, password, role: "student", user: student._id });

    student.course = undefined;
    student.semesters = undefined;

    return SuccessResponse(res, "Student added successfully", student);
});


exports.addMultipleStudents = asyncHandler(async (req, res) => {

    if (!req.file) {
        return ErrorResponse(res, 400, "No file selected");
    }

    const { course, currentSemester } = req.body;

    const courseRes = await courseDB.findOne({ name: course });
    if (!courseRes) {
        return ErrorResponse(res, 404, `${course} does not exists`);
    }

    const csvData = await csvtojson().fromFile(req.file.path);

    let completeStudentsCreated = true;
    const alreadyExistingStudents = [];
    const createdStudents = [];
    for (const row of csvData) {
        const name = row.Name;
        const rollNo = row.RollNo;
        // const email = row.Email;
        // const currentSemester = row.CurrentSemester;
        // const password = email.split("@")[0].toLowerCase();

        let student = await studentDB.findOne({ rollNo: rollNo });
        if (student) {
            alreadyExistingStudents.push(`Student already exists with the roll no. ${rollNo}`);
            completeStudentsCreated = false;
            continue;
        }

        const semesters = courseRes.semesters.map(semester => ({
            subjects: semester.subjects.map(subjectId => ({
                subject: subjectId,
                attendance: { ...attendance },
                marks: { ...marks },
            })),
        }));

        student = await studentDB.create({ name, rollNo, course: courseRes._id, semesters, currentSemester});

        await courseDB.updateOne({ name: course }, { $push: { students: student._id } });

        // await userDB.create({ email, password, role: "student", user: student._id });

        createdStudents.push(student.rollNo);
    }

    fs.unlink(req.file.path);

    if (completeStudentsCreated) {
        return SuccessResponse(res, "Students entry created successfully", createdStudents);
    } else {
        let data = {
            existingStudents: alreadyExistingStudents,
            createdEntry: createdStudents,
        };
        return ErrorResponse(res, 500, "Incomplete student entry creation", data);
    }
});

exports.generateLoginCredentialsForStudent = asyncHandler(async (req, res) => {
    const rollNo = req.body;

    const student = await studentDB.findOne({ rollNo });
    if (!student) {
        return ErrorResponse(res, 404, `Student does not exists with roll no. ${rollNo}`);
    }

    const { email, password } = req.body;

    const user = await userDB.findOne({ email });
    if (user) {
        return ErrorResponse(res, 400, "User already exists with the entered email");
    }

    await userDB.create({ email, password, role: "student", userId: student._id});

    return SuccessResponse(res, "User added successfully");
});


exports.deleteStudent = asyncHandler(async (req, res) => { 
    const { rollNo } = req.body;

    const student = await studentDB.findOne({ rollNo });
    if (!student) {
        return ErrorResponse(res, 404, `Student does not exist with the roll no. ${rollNo}`);
    }

    const user = await userDB.findById(student._id);
    if (user) {
        await userDB.findByIdAndDelete(student._id);
    }
    
    await courseDB.findByIdAndUpdate({ _id: student.course }, { $inc: { studentCount: -1 }, updatedAt: Date.now() });
    await studentDB.deleteOne({ rollNo });

    return SuccessResponse(res, "Student deleted");
});




// ============================================== ANNOUNCEMENT CONTROLLERS ==============================================


exports.createAnnouncement = asyncHandler(async(req, res) => {
    const file = req.file;
    const {title, content} = req.body;

    const image = ["jpeg", "jpg", "png"];
    const video = ["mp4", "mov", "wmv"];
    const fileExt = file.originalname.split(".")[1].toLowerCase();
    
    if(!image.includes(fileExt) && !video.includes(fileExt)){
        return ErrorResponse(res, 400, "File type not supported");
    }

    const uploadPath = path.join(__dirname, `/../../public/announcements/${Date.now()}.${imageExt}`);
    fs.writeFileSync(uploadPath, fs.readFileSync(file.path));

    const annData = await annDB.create({title, content, url:uploadPath});

    return SuccessResponse(res, "Announcement created successfully", annData);
});
