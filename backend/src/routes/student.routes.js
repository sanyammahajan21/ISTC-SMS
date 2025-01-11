const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer.middlewares")
const { verifyToken, verifyRole } = require("../middlewares/user.middlewares");

const {
    studentResult,
    updateProfile,
    showProfile,
    checkEditAllowed,
} = require("../controllers/student.controllers");


// ============================================== PROFILE ROUTES ==============================================

// CHECK PROFILE EDIT ALLOWED
router.get("/profile/check-edit-allowed", verifyToken, verifyRole, checkEditAllowed);

// GET PROFILE DETAILS ROUTE
router.get("/profile/show", verifyToken, verifyRole, showProfile);

//UPDATE PROFILE ROUTE
router.put("/profile/update", verifyToken, verifyRole, upload.single("image"), updateProfile);



// ============================================== RESULT ROUTES ==============================================

// DOWNLOAD RESULT ROUTE
router.put("/result/download", verifyToken, verifyRole, upload.none(), studentResult);


module.exports = router;