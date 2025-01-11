require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const userDB = require("../models/user.models");
const otpDB = require("../models/otp.models");
const { asyncHandler } = require("../utils/handler.utils");
const { mailer } = require("../utils/mailer.utils");
const { ErrorResponse, SuccessResponse } = require("../utils/responses.utils");


// ============================================== LOGIN CONTROLLER ==============================================


exports.login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!role) {
        return ErrorResponse(res, 400, `Select the role`);
    }

    let user = await userDB.findOne({ email, role });
    if (!user) {
        return ErrorResponse(res, 404, "User does not exist");
    }

    if (!user.verified) {
        return ErrorResponse(res, 401, "Email is not verified", user.verified);
    }

    const passwordCorrect = await user.validatePassword(password);
    if (!passwordCorrect) {
        return ErrorResponse(res, 403, "Password is incorrect");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true
    }

    user.password = undefined;
    user.refreshToken = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "Logged In",
        data: user.verified,
        user,
        accessToken,
        refreshToken
    });

});


// ============================================== LOGOUT CONTROLLER ==============================================


exports.logout = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await userDB.findByIdAndUpdate(userId, {$set: {refreshToken: ""}}, {new: true});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        success: true,
        message: "Logged Out"
    })
});


// ============================================== REFRESH ACCESS TOKEN CONTROLLER ==============================================


exports.refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return ErrorResponse(res, 401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await userDB.findById(decodedToken?._id);

    if (!user) {
        return ErrorResponse(res, 401, "Invalid refresh token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        return ErrorResponse(res, 401, "Session expired");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "Session renewed",
        user,
        accessToken,
        refreshToken
    });
});


// ============================================== SEND VERIFICATION OTP CONTROLLER ==============================================


exports.sendVerificationOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return ErrorResponse(res, 400, "Enter the email");
    }

    const user = await userDB.findOne({ email });
    if (!user) {
        return ErrorResponse(res, 404, "User does not exists");
    } 

    let otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    let otpRes = await otpDB.findOne({ otp });
    while (otpRes) {
        otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
    
        otpRes = await otpDB.findOne({ otp });
    }

    await mailer(
        email, 
        `Verification email from Indo-Swiss Training Centre`,
        `Use the OTP : ${otp} for your verification`
    )

    otpRes = await otpDB.create({ email, otp });

    return SuccessResponse(res, "OTP sent successfully");
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const recentOTP = await otpDB.findOne({ email }).sort({ createdAt : -1 }).limit(1);

    if (!recentOTP) {
        return ErrorResponse(res, 400, "OTP expired. Try again.");
    } else if (otp !== recentOTP.otp) {
        return ErrorResponse(res, 400, "Entered otp is wrong"); 
    }

    return SuccessResponse(res, "OTP verified successfully");
});

// ============================================== VERIFY EMAIL CONTROLLER ==============================================

exports.verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await userDB.findOne({ email });
    if (user.verified) {
        return ErrorResponse(res, 400, "User already verified");
    }

    user.verified = true;
    await user.save();

    return SuccessResponse(res, "User verified successfully");
});


// ============================================== CHANGE PASSWORD CONTROLLER ==============================================


exports.changePassword = asyncHandler(async (req, res) => { 

    const id = req.user._id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await userDB.findById(id);
    
    const passwordCorrect = await user.validatePassword(oldPassword);
    if (!passwordCorrect) {
        return ErrorResponse(res, 401, "Old password is inccorect")
    }

    if (newPassword !== confirmPassword) {
        return ErrorResponse(res, 400, "New password and confirm password does not match");
    }

    user.password = newPassword;
    await user.save();
    // await userDB.findByIdAndUpdate({ _id : userId }, { newPassword });

    await mailer(
        email, 
        `E-mail regarding the password change`,
        `You password has been changed successfully`
    )

    return SuccessResponse(res, "Password changed successfully");
});


// ============================================== RESET PASSWORD CONTROLLER ==============================================


exports.resetPassword = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return ErrorResponse(res, 400, "New password and confirm password does not match");
    }
        
    await userDB.findOneAndUpdate({ email }, { password });

    return SuccessResponse(res, "Password reset successfully");
});

// exports.sendResetPasswordEmail = asyncHandler(async (req, res) => {  
//     const { email } = req.body;

//     const user = await userDB.findOne({ email });
//     if (!user) {
//         return ErrorResponse(res, 404, "User does not exists");
//     }

//     // const token = crypto.randomBytes(64);
//     const resetPasswordToken = crypto.randomUUID();
    
//     user.resetPasswordToken = resetPasswordToken;
//     user.resetPasswordTokenExpiry = Date.now() + 5*60*1000;
//     await user.save();

//     const resetPasswordLink = `http://localhost:3000/reset-password/${resetPasswordToken}`;

//     await mailer(
//         email,
//         `E-mail for password reset`,
//         `Click on the link : ${resetPasswordLink} to reset your password. The link will be valid for five minutes.`
//     )

//     return SuccessResponse(res, "A reset password email has been sent to your email address");
// });


// exports.resetPassword = asyncHandler(async (req, res) => {
//     const { resetPasswordToken, newPassword, confirmPassword } = req.body;

//     if (newPassword !== confirmPassword) {
//         return ErrorResponse(res, 400, "New password and confirm password does not match");
//     }

//     const user = await userDB.findOne({ resetPasswordToken });
//     if (!user) {
//         return ErrorResponse(res, 400, "Invalid token");
//     }

//     if (user.resetPasswordTokenExpiry < Date.now()) {
//         return ErrorResponse(res, 401, "Reset password token is expired. Try again later");
//     }


//     // await userDB.findByIdAndUpdate(user._id, {password: newPassword});
//     user.password = newPassword;
//     await user.save();

//     await mailer(
//         user.email,
//         `Mail regarding password reset`,
//         `Your password has been reset successfully`
//     )

//     return SuccessResponse(res, "Success");
// });