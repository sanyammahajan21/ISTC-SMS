import React, { useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";

function Users() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="h-screen ">
        <div className="flex flex-col gap-1"></div>
      </div>

      <div className="w-full h-screen mt-3 ml-6">
        

        <div className="flex flex-wrap items-center justify-center gap-6 mt-36 font-poppins">
          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Add User <IoBookSharp />
              </h5>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Click Below for Students
            </p> */}

            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
               transition-transform transform hover:scale-105 duration-300"
              onClick={() => navigate("/admin/add-user")}
            >
              Add +
            </a>
          </div>

          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Delete User <GiTeacher />
              </h5>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Click Below for Students
            </p> */}
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
               transition-transform transform hover:scale-105 duration-300"
               onClick={() => navigate("/admin/delete-user")}
            >
              Add +
            </a>
          </div>
          
        </div>
        {/* <div className="flex flex-wrap items-center justify-center gap-6 mt-6 font-poppins">
          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Set Attendance Criteria <GiTeacher />
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Click Below for Students
            </p>
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
               transition-transform transform hover:scale-105 duration-300"
               onClick={() => navigate("/admin/subjects/setCriteria")}
            >
              Add +
            </a>
          </div>
          </div> */}
      </div>
    </div>
  );
}

export default Users;
