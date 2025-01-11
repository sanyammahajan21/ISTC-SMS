import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function StudentResultAfterSemester() {
  const navigate = useNavigate();
//   const [showTable, setShowTable] = useState(false);
//   const [selectedSemester, setSelectedSemester] = useState("1");

//   // Handler function to update selected semester
//   const handleSemesterChange = (event) => {
//     setSelectedSemester(event.target.value);
//   };
//   useEffect(() => {
//   }, [selectedSemester]);

//   const handleFormSubmit = () => {
//     setShowTable(true);
//   };
  return (
    <div className="bg-lavender font-poppins text-black-blue flex">
    <div className="w-1/5 h-screen">
      <div className="flex flex-col gap-1">
        {/* Admin Title bar */}
        <div className=" flex justify-center items-end h-32 bg-white ">
          <h1 className="flex font-normal text-3xl pb-3">
            <RiAdminLine /> Student
          </h1>
        </div>

        {/* Menu bar */}
        <div className="bg-white w-full h-screen flex flex-col pt-8 pl-12 gap-4 ">
          <div className="hover:text-custom-color cursor-pointer">
            Dashboad
          </div>
          <div
            className="hover:text-custom-color cursor-pointer"
            onClick={() => {
              navigate("/student/profile");
            }}
          >
            Profile
          </div>
          <div className="hover:text-custom-color cursor-pointer">
            Attendance
          </div>
          <div
            className="hover:text-custom-color cursor-pointer"
            onClick={() => navigate("/student/result")}
          >
            Result
          </div>
          <div className="hover:text-custom-color cursor-pointer">
            Syllabus{" "}
          </div>
          <div className="hover:text-custom-color cursor-pointer">Fee</div>
        </div>
      </div>
    </div>

    <div className="w-4/5 h-screen">
      <div className="flex justify-center">
        <div className="bg-white w-screen flex items-center justify-start h-20 p-4 m-4 rounded-2xl">
          <h1 className="text-4xl font-semibold">Student Dashboard</h1>
        </div>
      </div>
      <h1 className="flex justify-center text-4xl font-bold font-poppins mt-60">
        Welcome to student Dashboard
      </h1>
    </div>
  </div>

   
  );
}

export default StudentResultAfterSemester;
