const { Schema, mongo, default: mongoose } = require("mongoose");
const { mailer } = require("../utils/mailer.utils");

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});


// async function sendOTP (email, otp) {
//     try {
//         const mailResponse = await mailer(
//             email, 
//             `Verification email from Indo-Swiss Training Centre`, 
//             `Use the OTP : ${otp} for your verification`
//         );

//         return;
//     } catch (error) {
//         throw new error;
//     }
// }


// otpSchema.pre("save", async function (next) {
//     await sendOTP(this.email, this.otp);
//     next();
// }); 


module.exports = mongoose.model("otpDB", otpSchema);