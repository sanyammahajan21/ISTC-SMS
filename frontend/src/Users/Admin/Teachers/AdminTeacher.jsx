import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { SiMdbook } from "react-icons/si";
import { TbZoomInFilled } from "react-icons/tb";
import JumpingArrowIcon from "../../../lib/jumpingArrow";
import { GiTeacher } from "react-icons/gi";

function AdminTeacher() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="h-screen ">
        <div className="flex flex-col gap-1"></div>
      </div>
      <div className="w-full h-screen mt-3 ml-6">
        <h1 className="flex items-center justify-center gap-4 mt-10 text-4xl font-extrabold">
          Teachers
          <div>
            <JumpingArrowIcon className="font-bold " />
          </div>
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 font-poppins mt-20">
          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Add Teacher <PiStudentBold />
              </h5>
            </a>
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
                 transition-transform transform hover:scale-105 duration-300 gap-2"
              onClick={() => navigate("/admin/teachers/add")}
            >
              Add
              <IoIosAddCircle />
            </a>
          </div>

          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Allot Subject
                <SiMdbook />
              </h5>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               Click Below for Students
              </p> */}
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
                 transition-transform transform hover:scale-105 duration-300 gap-3"
              onClick={() => navigate("/admin/teachers/allotSubject")}
            >
              Allot
              <MdEditSquare />
            </a>
          </div>

          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Delete Teacher{" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxmyDOBk6f6bk0COGgeGUjKJyvIjT7terxi-qQHRlUg&s"
                  width={30}
                  height={30}
                ></img>
              </h5>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               Click Below for Students
              </p> */}
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
                 transition-transform transform hover:scale-105 duration-300"
              onClick={() => navigate("/admin/teachers/delete")}
            >
              Delete
              <MdDelete />
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-9">
          <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
            <a>
              <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
                Remove Subject
                <SiMdbook />
              </h5>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               Click Below for Students
              </p> */}
            <a
              className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
              transition-transform transform hover:scale-105 duration-300 "
              onClick={() => navigate("/admin/teachers/removeSubject")}
            >
              Remove
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminTeacher;
