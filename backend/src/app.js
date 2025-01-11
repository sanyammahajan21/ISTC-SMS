const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// CREATING THE APP
const app = express();


// ADDING THE CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});



// ADDING MIDDLEWARE FOR PARSING THE JSON REQUEST BODY
app.use(express.json({limit: "16kb"}));

// ADDING MIDDLEWARE FOR PARSING THE URL
app.use(express.urlencoded({extended: true}));

// ADDING MIDDLEWARE FOR STORING THE FILES TO THE PUBLIC FOLDER
app.use(express.static("public"));

// ADDING MIDDLEWARE FOR PARSING THE COOKIES
app.use(cookieParser());



// MOUTING THE LOGIN ROUTES
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user", userRoutes);

// MOUNTING THE ADMIN ROUTES
const adminRoutes = require("./routes/admin.routes");
app.use("/api/v1/admin", adminRoutes);


// MOUNTING THE REGISTRAR ROUTES
const registrarRoutes = require("./routes/registrar.routes");
app.use("/api/v1/registrar", registrarRoutes);

// MOUNTING THE STUDENT ROUTES
const studentRoutes = require("./routes/student.routes");
app.use("/api/v1/student", studentRoutes);

// MOUNTING THE TEACHER ROUTES
const teacherRoutes = require("./routes/teacher.routes");
app.use("/api/v1/teacher", teacherRoutes);



module.exports = app; 