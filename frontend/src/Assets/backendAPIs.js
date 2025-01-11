// const backend_host = "http://192.168.221.21:4000";
// const backend_host = "http://172.20.10.7:4000";
const backend_host = "http://localhost:4000";
const version1 = "/api/v1"
const base_url = `${backend_host}${version1}`;

const user = `${base_url}/user`
const admin = `${base_url}/admin`;
const registrar = `${base_url}/registrar`;
const teacher = `${base_url}/teacher`;
const student = `${base_url}/student`;




// ================================================== USER APIs ==================================================


const loginAPI = `${user}/login`;
const logoutAPI = `${user}/logout`;
const verifyTokenAPI = `${user}/verify-token`;
const refreshAccessTokenAPI = `${user}/refresh-access-token`;
const sendVerificationOtpAPI = `${user}/send-verification-otp`;
const verifyOtpAPI = `${user}/verify-otp`;
const verifyEmailAPI = `${user}/verify-email`;
const changePasswordAPI = `${user}/change-password`;
const resetPasswordAPI = `${user}/reset-password`;



// ================================================== ADMIN APIs ==================================================

// ================= COURSE FUNCTIONALITY APIs =================

const addUserAPI_Admin = `${admin}/users/add`;
const deleteUserAPI_Admin = `${admin}/users/delete`;


// ================= COURSE FUNCTIONALITY APIs =================

const addCourseAPI_Admin = `${admin}/courses/add`;
const deleteCourseAPI_Admin = `${admin}/courses/delete`;
const getCoursesAPI_Admin = `${admin}/courses/get`;

// ================= SUBJECT FUNCTIONALITY APIs =================

const addSingleSubjectAPI_Admin = `${admin}/subjects/add-single`;
const addMultipleSubjectsAPI_Admin = `${admin}/subjects/add-multiple`
const deleteSubjectAPI_Admin = `${admin}/subjects/delete`;
const getSubjectsAPI_Admin = `${admin}/subjects/get`;

// ================= TEACHER FUNCTIONALITY APIs =================

const addTeacherAPI_Admin = `${admin}/teachers/add`;
const deleteTeacherAPI_Admin = `${admin}/teachers/delete`;
const allotSubjectToTeacherAPI_Admin = `${admin}/teachers/allot-subject`;
const removeSubjectFromTeacherAPI_Admin = `${admin}/teachers/remove-subject`;

// ================= STUDENT FUNCTIONALITY APIs =================

const addSingleStudentAPI_Admin = `${admin}/students/add-single`;
const generateLoginCredentialsForStudentAPI_Admin = `${admin}/students/generate-login-credentials`;
const addMultipleStudentsAPI_Admin = `${admin}/students/add-multiple`;
const addMultipleStudentsTempAPI_Admin = `${admin}/students/add/multipleTemp`;
const deleteStudentAPI_Admin = `${admin}/students/delete`;


const createAnnouncementAPI_Admin = `${admin}/announcements/create`;


// ================================================== REGISTRAR APIs ==================================================

// COMMON APIs
const getCoursesAPI_Registrar = `${registrar}/courses/get`;
const getSubjectsAPI_Registrar = `${registrar}/subjects/get`;

// ATTENDANCE APIs
const showAttendanceAPI_Registrar = `${registrar}/attendance/show`;
const downloadAttendanceAPI_Registrar = `${registrar}/attendance/download`;

// MARKS APIs
const showMarksAPI_Registrar = `${registrar}/marks/show`;
const downloadMarksAPI_Registrar = `${registrar}/marks/download`;
const enterOldMarksAPI_Registrar = `${registrar}/marks/enter-old`;

// DOCUMENTS APIs
const getStudentsForDmcAPI_Registrar = `${registrar}/documents/get-dmc-students`;
const getPassedStudentsAPI_Registrar = `${registrar}/documents/get-passed-students`;

const downloadDmcAPI_Registrar = `${registrar}/documents/dmc/download`;
const downloadMultipleDMCsAPI_Registrar = `${registrar}/documents/dmc/download-multiple`;

const downloadCharacterAPI_Registrar = `${registrar}/documents/cc/download`;
const downloadMultipleCCsAPI_Registrar = `${registrar}/documents/cc/download-multiple`;

const downloadMigrationAPI_Registrar = `${registrar}/documents/mc/download`;
const downloadMultipleMCsAPI_Registrar = `${registrar}/documents/mc/download-multiple`;




// ================================================== TEACHER APIs ==================================================

// COMMON APIs
const getSubjectsForTeacherAPI_Teacher = `${teacher}/subjects/get`;

// PROFILE APIs
const checkProfileEditAllowed_Teacher = `${teacher}/profile/check-edit-allowed`;
const showProfileDetails_Teacher = `${teacher}/profile/show`;
const updateProfileAPI_Teacher = `${teacher}/profile/update`;


// ATTENDANCE APIs
const showAttendanceAPI_Teacher = `${teacher}/attendance/show`;
const enterAttendanceAPI_Teacher = `${teacher}/attendance/enter`;
const downloadAttendanceAPI_Teacher = `${teacher}/attendance/download`;


// MARKS APIs
const showMarksAPI_Teacher = `${teacher}/marks/show`;
const enterMarksAPI_Teacher = `${teacher}/marks/enter`;
const downloadMarksAPI_Teacher = `${teacher}/marks/download`




// ================================================== STUDENT APIs ==================================================


// PROFILE APIs
const checkProfileEditAllowed_Student = `${student}/profile/check-edit-allowed`;
const showProfileDetails_Student = `${student}/profile/show`;
const updateProfileAPI_Student = `${student}/profile/update`;

const downloadResultAPI_Student = `${student}/result/download`;



export {
    loginAPI,
    logoutAPI,
    verifyTokenAPI,
    refreshAccessTokenAPI,
    sendVerificationOtpAPI,
    verifyEmailAPI,
    changePasswordAPI,
    verifyOtpAPI,
    resetPasswordAPI,

    addUserAPI_Admin,
    deleteUserAPI_Admin,
    addCourseAPI_Admin, 
    getCoursesAPI_Admin, 
    deleteCourseAPI_Admin,
    addSingleSubjectAPI_Admin, 
    addMultipleSubjectsAPI_Admin,
    getSubjectsAPI_Admin, 
    deleteSubjectAPI_Admin,
    addTeacherAPI_Admin, 
    deleteTeacherAPI_Admin,
    allotSubjectToTeacherAPI_Admin,
    removeSubjectFromTeacherAPI_Admin,
    addSingleStudentAPI_Admin, 
    addMultipleStudentsAPI_Admin,
    addMultipleStudentsTempAPI_Admin,
    generateLoginCredentialsForStudentAPI_Admin,
    deleteStudentAPI_Admin,
    createAnnouncementAPI_Admin,
    
    getCoursesAPI_Registrar,
    getSubjectsAPI_Registrar,
    showMarksAPI_Registrar,
    showAttendanceAPI_Registrar,
    downloadMarksAPI_Registrar,
    enterOldMarksAPI_Registrar,
    downloadAttendanceAPI_Registrar,
    getStudentsForDmcAPI_Registrar,
    getPassedStudentsAPI_Registrar,
    downloadDmcAPI_Registrar,
    downloadMultipleDMCsAPI_Registrar,
    downloadCharacterAPI_Registrar,
    downloadMultipleCCsAPI_Registrar,
    downloadMigrationAPI_Registrar,
    downloadMultipleMCsAPI_Registrar,

    getSubjectsForTeacherAPI_Teacher,
    showAttendanceAPI_Teacher,
    enterAttendanceAPI_Teacher,
    enterMarksAPI_Teacher,
    downloadMarksAPI_Teacher,
    showMarksAPI_Teacher,
    downloadAttendanceAPI_Teacher,
    updateProfileAPI_Teacher,
    showProfileDetails_Teacher,
    checkProfileEditAllowed_Teacher,

    showProfileDetails_Student,
    checkProfileEditAllowed_Student,
    updateProfileAPI_Student,
    downloadResultAPI_Student,
};