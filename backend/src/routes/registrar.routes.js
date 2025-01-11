const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer.middlewares");
const { verifyToken, verifyRole } = require("../middlewares/user.middlewares");

const { showMarks,
        showAttendance,
        downloadAttendance,
        downloadMarks,
        downloadDMC,
        getStudentsForDMC,
        getPassedStudents,
        getCourses,
        getSubjects,
        downloadCC,
        downloadMC,
        downloadMultipleDMCs,
        downloadMultipleCCs,
        downloadMultipleMCs,
        enterOldMarks,
} = require("../controllers/registrar.controllers");




// ============================================== ATTENDANCE ROUTES ==============================================


// GET COURSES ROUTE
router.get("/courses/get", verifyToken, verifyRole, getCourses);

// GET SUBJECTS ROUTE
router.get("/subjects/get", verifyToken, verifyRole, getSubjects);


// ============================================== ATTENDANCE ROUTES ==============================================

// SHOW ATTENDANCE ROUTE
router.get("/attendance/show", verifyToken, verifyRole, showAttendance);


// DOWNLOAD ATTENDANCE CSV ROUTE
router.get("/attendance/download", verifyToken, verifyRole, downloadAttendance);


// ============================================== MARKS ROUTES ==============================================

// SHOW MARKS ROUTE
router.get("/marks/show", verifyToken, verifyRole, showMarks);

// DOWNLOAD MARKS CSV ROUTE
router.get("/marks/download", verifyToken, verifyRole, downloadMarks);


// ENTER OLD MARKS ROUTE
router.put("/marks/enter-old", verifyToken, verifyRole, enterOldMarks);


// ============================================== DOCUMENTS ROUTES ==============================================

// GET STUDENTS FOR DMC
router.get("/documents/get-dmc-students", verifyToken, verifyRole, getStudentsForDMC);

// GET PASSED STUDENS
router.get("/documents/get-passed-students", verifyToken, verifyRole, getPassedStudents);


// DOWNLOAD DMC
router.get("/documents/dmc/download", verifyToken, verifyRole, downloadDMC);

// DOWNLOAD MULTIPLE DMCs
router.get("/documents/dmc/download-multiple", verifyToken, verifyRole, downloadMultipleDMCs);


// DOWNLOAD CHARACTER CERTIFICATE
router.get("/documents/cc/download", verifyToken, verifyRole, downloadCC);

// DOWNLOAD MULTIPLE CHARACTER CERTIFICATES
router.get("/documents/cc/download-multiple", verifyToken, verifyRole, downloadMultipleCCs);


// DOWNLOAD MIGRATION CERTIFICATE
router.get("/documents/mc/download", verifyToken, verifyRole, downloadMC);

// DOWNLOAD MULTIPLE MIGRATION CERTIFICATES
router.get("/documents/mc/download-multiple", verifyToken, verifyRole, downloadMultipleMCs);



module.exports = router;