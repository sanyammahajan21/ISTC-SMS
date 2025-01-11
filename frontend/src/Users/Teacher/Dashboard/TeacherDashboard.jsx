import NavBar from "../../../Assets/NavBar";
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../../../Assets/PrivateRoute";

const TeacherDashboard = () => {
  return (
    <div className=" h-screen w-screen text-black-blue background">
      <h5 className="flex justify-center text-4xl font-bold font-poppins pt-60">
        Welcome to Teacher Dashboard
      </h5>
    </div>
  );
};

export default TeacherDashboard;
