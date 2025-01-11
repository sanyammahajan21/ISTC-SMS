import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineMenuBook } from "react-icons/md";
import { SiMdbook } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";

const Documents = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen ml-8-6 pt-14 text-black-blue background">
    <div className="flex justify-center gap-6 mt-9">
      <div className="transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[350px]  flex-col  justify-center">
        <a>
          <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
            Admit Card  <MdOutlineMenuBook />
          </h5>
        </a>
     
        <a
          className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
         transition-transform transform hover:scale-105 duration-300"
          onClick={() => navigate("/registrar/admitcard")}
        >
          Open
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  w-[350px]
    transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out   flex-col  justify-center">
        <a>
          <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
            DMC  <SiMdbook />
          </h5>
        </a>
      
        <a
          className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
         transition-transform transform hover:scale-105 duration-300"
          onClick={() => navigate("/registrar/dmc")}
        >
          Open
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>

      
    </div>
    
    <div className="flex mx-auto justify-center pt-8 gap-6">
    <div className=" max-w-sm p-6 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800  w-[350px]
    transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out   flex-col  justify-center">
        <a>
          <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
            Transcript  <PiStudentBold />
          </h5>
        </a>
      
        <a
          className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
         transition-transform transform hover:scale-105 duration-300"
          onClick={() => navigate("/registrar/transcript")}
        >
          Open
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  w-[350px]
    transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out   flex-col  justify-center">
        <a>
          <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
          Character <SiMdbook />
          </h5>
        </a>
      
        <a
          className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
         transition-transform transform hover:scale-105 duration-300"
          onClick={() => navigate("/registrar/character")}
        >
          Open
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  w-[350px]
    transition-transform t  hover:scale-105 hover:bg-lavender duration-105 ease-in-out   flex-col  justify-center">
        <a>
          <h5 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-gray-900 jumb-2 dark:text-white">
            Migration <SiMdbook />
          </h5>
        </a>
      
        <a
          className="inline-flex items-center px-3 py-2 text-lg font-bold  text-white bg-[#1E2548] rounded-lg  cursor-pointer mt-4 ml-24 w-[100px] text-center
         transition-transform transform hover:scale-105 duration-300"
          onClick={() => navigate("/registrar/migration")}
        >
          Open
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      </div>
</div>
  )
}

export default Documents