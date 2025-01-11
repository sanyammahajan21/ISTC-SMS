const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer.middlewares");
const { verifyToken } = require("../middlewares/user.middlewares");

const { login,
        logout,
        refreshAccessToken,
        verifyEmail,
        changePassword,
        resetPassword,
        sendResetPasswordEmail,
        sendVerificationOTP,
        verifyOTP
    
} = require("../controllers/user.controllers");
const { SuccessResponse } = require("../utils/responses.utils");



// LOGIN ROUTE
router.post("/login", upload.none(), login);

// LOGOUT ROUTE
router.post("/logout", verifyToken, logout);

// VERIFY TOKEN ROUTE
router.post("/verify-token", verifyToken, (req, res) => {
    return SuccessResponse(res, "Success");
});





// REFRESH TOKEN ROUTE
router.post("/refresh-access-token", refreshAccessToken);




// SEND VERIFICATION OTP ROUTE
router.post("/send-verification-otp", upload.none(), sendVerificationOTP);

// VERIFY OTP ROUTE
router.post("/verify-otp", upload.none(), verifyOTP);



// VERIFY EMAIL ROUTE
router.post("/verify-email", upload.none(), verifyEmail);

// RESET PASSWORD ROUTE
router.post("/reset-password", upload.none(), resetPassword);

// CHANGE PASSWORD ROUTE
router.post("/change-password", verifyToken, upload.none(), changePassword);




// SEND RESET PASSWORD MAIL ROUTE
// router.post("/send-reset-password-email", upload.none(), sendResetPasswordEmail);





module.exports = router;