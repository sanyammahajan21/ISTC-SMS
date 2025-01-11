const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer.middlewares");
const { verifyToken, verifyRole } = require("../middlewares/user.middlewares");

const { updateProfile,
        getSubjects,
        showMarks,
        enterMarks,
        showAttendance,
        enterAttendance,
        downloadAttendance,
        downloadMarks,
        showTeacherProfile,
        checkEditAllowed,
} = require("../controllers/teacher.controllers");




// ============================================== COMMON USED ROUTES ==============================================


// GET SUBJECT ROUTE
router.get("/subjects/get", verifyToken, verifyRole, getSubjects);




// ============================================== PROFILE ROUTES ==============================================


// CHECK PROFILE EDIT ALLOWED
router.get("/profile/check-edit-allowed", verifyToken, verifyRole, checkEditAllowed);

// GET TEACHER PROFILE DETAILS ROUTE
router.get("/profile/show", verifyToken, verifyRole, showTeacherProfile);

//UPDATE PROFILE ROUTE
router.put("/profile/update", verifyToken, verifyRole, upload.single("image"), updateProfile);




// ============================================== ATTENDANCE ROUTES ==============================================


// SHOW ATTENDANCE ROUTE
router.get("/attendance/show", verifyToken, verifyRole, showAttendance);

// ENTER ATTENDANCE ROUTE
router.put("/attendance/enter", verifyToken, verifyRole, upload.none(), enterAttendance);

// DOWNLOAD ATTENDANCE ROUTE
router.get("/attendance/download", verifyToken, verifyRole, downloadAttendance);




// ============================================== MARKS ROUTES ==============================================


// SHOW MARKS ROUTE
router.get("/marks/show", verifyToken, verifyRole, showMarks);

// ENTER MARKS ROUTE
router.put("/marks/enter", verifyToken, verifyRole, upload.none(), enterMarks);

// DOWNLOAD MARKS ROUTE
router.get("/marks/download", verifyToken, verifyRole, downloadMarks);





module.exports = router;