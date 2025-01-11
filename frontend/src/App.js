import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import AdminDashboard from "./Users/Admin/Dashboard/AdminDashboard"
import RegistrarDashboard from "./Users/Registrar/Dashboard/RegistrarDashboard";
import TeacherDashboard from "./Users/Teacher/Dashboard/TeacherDashboard";
import StudentDashboard from "./Users/Student/Dashboard/StudentDashboard";
import DeleteSubject from "./Users/Admin/Subjects/DeleteSubject"

import Attendance from "./Users/Registrar/Attendance/Attendance";
import PrivateRoute from "./Assets/PrivateRoute";
import StudentProfile from "./Users/Student/Profile/StudentProfile";
import AdminResult from "./Users/Registrar/Marks/AdminResult";
import StudentResult from "./Users/Student/Result/StudentResult";
import TeacherProfile from "./Users/Teacher/Profile/TeacherProfile";
import Annoucements from "./Users/Admin/Announcements/Annoucements.popup.";
import AdmitCard from "./Users/Registrar/Documents/AdmitCard/AdmitCard";
import AttendanceTeacher from "./Users/Teacher/Attendance/AttendanceTeacher";
import DeleteStudent from "./Users/Admin/Students/DeleteStudent";
import SearchStudent from "./Users/Admin/Students/SearchStudent";
import AdminTeacher from "./Users/Admin/Teachers/AdminTeacher";
import NavBar from "./Assets/NavBar";
import Login from "./Login/Login";
import AdminSubjects from "./Users/Admin/Subjects/AdminSubjects";
import AddSingleSubject from "./Users/Admin/Subjects/AddSingleSubject";
import AddSingleStudent from "./Users/Admin/Students/AddSingleStudent";
import AddMultipleStudents from "./Users/Admin/Students/AddMultipleStudents";
import AdminStudents from "./Users/Admin/Students/AdminStudents";
import AdminCourses from "./Users/Admin/Courses/AdminCourses";
import AddCourse from "./Users/Admin/Courses/AddCourse";
import DeleteCourse from "./Users/Admin/Courses/DeleteCourse";
import AddTeacher from "./Users/Admin/Teachers/AddTeacher";
import DeleteTeacher from "./Users/Admin/Teachers/DeleteTeacher";
import AllotSubject from "./Users/Admin/Teachers/AllotSubject";
import RemoveSubject from "./Users/Admin/Teachers/RemoveSubject";
import { useLocation } from "react-router-dom";
import Documents from "./Users/Registrar/Documents/Documents";
import Dmc from "./Users/Registrar/Documents/DMC/Dmc";
import Transcript from "./Users/Registrar/Documents/Transcript/Transcript";
import Character from "./Users/Registrar/Documents/Character/Character";
import Migration from "./Users/Registrar/Documents/Migration/Migration";
import Permissions from "./Users/Admin/Permissions/Permissions";
import SubjectCard from "./Users/Teacher/Result/SubjectCard";
import SetCriteria from "./Users/Admin/Subjects/SetCriteria";
import OldEntry from "./Users/Registrar/Old Entry/OldEntry";
import Verify from "./Login/Verify/Verify";
import ResetPass from "./Login/Reset Password/ResetPass";
import AddUser from "./Users/Admin/Add Users/AddUser";
import Users from "./Users/Admin/Add Users/Users";
import DeleteUsers from "./Users/Admin/Add Users/DeleteUsers";
import OldEntryModal from "./Users/Registrar/Old Entry/OldEntryModal";



function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const isLoginPage = location.pathname === "/";


  return (
    <div className="relative w-screen h-screen overflow-hidden ">
      {isLoggedIn && !isLoginPage && <NavBar userRole={userRole} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>

        {/* Login route */}
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} ></Login>} ></Route>
        <Route path="/verify" element={<Verify ></Verify>} ></Route>
        <Route path="/reset" element={<ResetPass ></ResetPass>} ></Route>





        {/* Admin routes */}
        <Route path="/admin" element={PrivateRoute({ element: <AdminDashboard />, requiredRole: 'admin', userRole, isLoggedIn, })} />
       
        <Route path="/admin/users" element={PrivateRoute({ element: <Users />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/add-user" element={PrivateRoute({ element: <AddUser />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/delete-user" element={PrivateRoute({ element: <DeleteUsers />, requiredRole: 'admin', userRole, isLoggedIn, })} />

        <Route path="/admin/courses" element={PrivateRoute({ element: <AdminCourses />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/courses/add" element={PrivateRoute({ element: <AddCourse />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/courses/delete" element={PrivateRoute({ element: <DeleteCourse />, requiredRole: 'admin', userRole, isLoggedIn, })} />

        <Route path="/admin/subjects" element={PrivateRoute({ element: <AdminSubjects />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/subjects/setCriteria" element={PrivateRoute({ element: <SetCriteria />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/subjects/addSingle" element={PrivateRoute({ element: <AddSingleSubject />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/subjects/deleteSubject" element={PrivateRoute({ element: <DeleteSubject />, requiredRole: 'admin', userRole, isLoggedIn, })} />

        <Route path="/admin/teachers" element={PrivateRoute({ element: <AdminTeacher />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/teachers/add" element={PrivateRoute({ element: <AddTeacher />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/teachers/delete" element={PrivateRoute({ element: <DeleteTeacher />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/teachers/allotSubject" element={PrivateRoute({ element: <AllotSubject></AllotSubject>, requiredRole: 'admin', userRole, isLoggedIn })}></Route>
        <Route path="/admin/teachers/removeSubject" element={PrivateRoute({ element: <RemoveSubject></RemoveSubject>, requiredRole: 'admin', userRole, isLoggedIn })}></Route>

        <Route path="/admin/students" element={PrivateRoute({ element: <AdminStudents />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/students/add/single" element={PrivateRoute({ element: <AddSingleStudent />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/students/add/multiple" element={PrivateRoute({ element: <AddMultipleStudents />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/students/delete" element={PrivateRoute({ element: <DeleteStudent />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/students/search" element={PrivateRoute({ element: <SearchStudent />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/annoucements" element={PrivateRoute({ element: <Annoucements />, requiredRole: 'admin', userRole, isLoggedIn, })} />
        <Route path="/admin/permissions" element={PrivateRoute({ element: <Permissions />, requiredRole: 'admin', userRole, isLoggedIn, })} />





        {/* Registrar routes */}
        <Route path="/registrar" element={PrivateRoute({ element: <RegistrarDashboard />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/documents" element={PrivateRoute({ element: <Documents />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/admitcard" element={PrivateRoute({ element: <AdmitCard />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/dmc" element={PrivateRoute({ element: <Dmc />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/character" element={PrivateRoute({ element: <Character />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/migration" element={PrivateRoute({ element: <Migration />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/transcript" element={PrivateRoute({ element: <Transcript />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/attendance" element={PrivateRoute({ element: <Attendance />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/marks" element={PrivateRoute({ element: <AdminResult />, requiredRole: 'registrar', userRole, isLoggedIn, })} />
        <Route path="/registrar/old-entry" element={PrivateRoute({ element: <OldEntryModal/>, requiredRole: 'registrar', userRole, isLoggedIn, })} />





        {/* Teacher routes */}
        <Route path="/teacher" element={PrivateRoute({ element: <TeacherDashboard />, requiredRole: 'teacher', userRole, isLoggedIn, })} />
        <Route path="/teacher/marks" element={PrivateRoute({ element: <SubjectCard />, requiredRole: 'teacher', userRole, isLoggedIn, })} />
        <Route path="/teacher/attendance" element={PrivateRoute({ element: <AttendanceTeacher />, requiredRole: 'teacher', userRole, isLoggedIn, })} />
        <Route path="/teacher/profile" element={PrivateRoute({ element: <TeacherProfile />, requiredRole: 'teacher', userRole, isLoggedIn, })} />






        {/* Student Routes */}
        <Route path="/student" element={PrivateRoute({ element: <StudentDashboard />, requiredRole: 'student', userRole, isLoggedIn, })} />
        <Route path="/student/profile" element={PrivateRoute({ element: <StudentProfile />, requiredRole: 'student', userRole, isLoggedIn, })} />
        <Route path="/student/result" element={PrivateRoute({ element: <StudentResult />, requiredRole: 'student', userRole, isLoggedIn, })} />




        
      </Routes>
    </div>
  );
}

export default App;
