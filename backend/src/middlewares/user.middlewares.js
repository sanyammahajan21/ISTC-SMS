require("dotenv").config();
const jwt = require("jsonwebtoken");
const userDB = require("../models/user.models");
const { ErrorResponse } = require("../utils/responses.utils");
const { asyncHandler } = require("../utils/handler.utils");

exports.verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return ErrorResponse(res, 401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userDB.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
        return ErrorResponse(res, 404, "User does not exists");
    }
    
    req.user = decodedToken;
    next();
});


exports.verifyRole = asyncHandler(async (req, res, next) => {
    
    const baseUrl = req.baseUrl;
    const requiredRoleInAPI = baseUrl.split("/")[3];
    
    if (req.user.role !== requiredRoleInAPI) {
        return ErrorResponse(res, 401, `Route unaccessible to ${req.user.role}`);
    }

    next();
});