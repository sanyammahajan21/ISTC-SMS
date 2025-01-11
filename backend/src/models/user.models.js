require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "registrar", "teacher", "student"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `role`,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        // resetPasswordToken: {
        //     type: String,
        // },
        // resetPasswordTokenExpiry: {
        //     type: Date
        // }
    },

    {timestamps: true}
);


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.validatePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            userId: this.userId,
            verified: this.verified
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}


module.exports = mongoose.model("userDB", userSchema);