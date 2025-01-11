const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer.middlewares");

const { verifyToken, verifyRole } = require("../middlewares/user.middlewares");

const { addCourse,
        deleteCourse,
        getCourses,
        getSubjects,
        addTeacher,
        addSingleStudent,
        addMultipleStudents,
        addMultipleSubjects,
        deleteStudent,
        deleteTeacher,
        addSingleSubject,
        fillSemestersArray,
        clearSemestersArray,
        allotSubjectToTeacher,
        removeSubjectFromTeacher,
        deleteSubject,
        addUser,
        createAnnouncement,
        generateLoginCredentialsForStudent,
        deleteUser,
} = require("../controllers/admin.controllers");




// ============================================== COMMON USED ROUTES ==============================================


// GET COURSE ROUTE
router.get("/courses/get", verifyToken, verifyRole, getCourses);

// GET SUBJECT ROUTE
router.get("/subjects/get", verifyToken, verifyRole, getSubjects);




// ============================================== USER ROUTES ==============================================


// ADD USER ROUTE -> ADMIN OR REGISTRAR
router.post("/users/add", verifyToken, verifyRole, upload.none(), addUser);

// DELETE USER ROUTE -> ADMIN OR REGISTRAR
router.delete("/users/delete", verifyToken, verifyRole, upload.none(), deleteUser);




// ============================================== COURSE FUNCTIONALITY ROUTES ==============================================

// CREATE COURSE ROUTE
router.post("/courses/add", verifyToken, verifyRole, upload.none(), addCourse);

// DELETE COURSE ROUTE
router.delete("/courses/delete", verifyToken, verifyRole, upload.none(), deleteCourse);


// FILL SEMESTERS ARRAY
router.put("/courses/semesters/fill", verifyToken, verifyRole, upload.single("file"), fillSemestersArray);

// CLEAR SUBJECTS ARRAY
router.put("/courses/semesters/clear", verifyToken, verifyRole, upload.none(), clearSemestersArray);



// ============================================== SUBJECT FUNCTIONALITY ROUTES ==============================================


// ADD SUBJECT ROUTE
router.post("/subjects/add-single", verifyToken, verifyRole, upload.none(), addSingleSubject);


// DELETE SUBJECT ROUTE
router.delete("/subjects/delete", verifyToken, verifyRole, upload.none(), deleteSubject);


// ADD MULTIPLE SUBJECTS ROUTES
router.post("/subjects/add-multiple", verifyToken, verifyRole, upload.single("file"), addMultipleSubjects);



// ============================================== TEACHER FUNCTIONALITY ROUTES ==============================================

// ADD SINGLE TEACHER
router.post("/teachers/add", verifyToken, verifyRole, upload.none(), addTeacher);

// DELETE TEACHER
router.delete("/teachers/delete", verifyToken, verifyRole, upload.none(), deleteTeacher);

// ALLOT SUBJECT TO TEACHER
router.put("/teachers/allot-subject", verifyToken, verifyRole, upload.none(), allotSubjectToTeacher);

// REMOVE SUBJECT FROM TEACHER
router.put("/teachers/remove-subject", verifyToken, verifyRole, upload.none(), removeSubjectFromTeacher);


// ============================================== STUDENT FUNCTIONALITY ROUTES ==============================================



// ADD SINGLE STUDENT
router.post("/students/add-single", verifyToken, verifyRole, upload.none(), addSingleStudent);

router.post("/students/generate-login-credentials",  verifyToken, verifyRole, generateLoginCredentialsForStudent);

// ADD MULTIPLE STUDENTS
router.post("/students/add-multiple", verifyToken, verifyRole, upload.single("file"), addMultipleStudents);

// DELETE STUDENT ROUTE
router.delete("/students/delete", verifyToken, verifyRole, upload.none(), deleteStudent);





// ============================================== ANNOUNCEMENT ROUTES ==============================================


// CREATE ANNOUNCEMENT ROUTE
router.post("/announcements/create", verifyToken, verifyRole, upload.single("file"), createAnnouncement);







module.exports = router;