import React, { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { logoutAPI } from "./backendAPIs";
import { toast } from "react-toastify";

const NavBar = ({ userRole, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const NavItems = {
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Announcement", path: "/admin/annoucements" },
      // { name: "Permissions", path: "/admin/permissions" },
    ],
    registrar: [
      { name: "Dashboard", path: "/registrar" },
      { name: "Attendance", path: "/registrar/attendance" },
      { name: "Marks", path: "/registrar/marks" },
      { name: "Documents", path: "/registrar/documents" },
      { name: "Old Entries", path: "/registrar/old-entry" },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher" },
      { name: "Profile", path: "/teacher/profile" },
      { name: "Attendance", path: "/teacher/attendance" },
      { name: "Marks", path: "/teacher/marks" },
    ],
    student: [
      { name: "Dashboard", path: "/student" },
      { name: "Profile", path: "/student/profile" },
      { name: "Result", path: "/student/result" },
    ],
  };

  async function handleLogout() {
    try {
      const url = logoutAPI;
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/");
        setIsLoggedIn(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during logout.";
      toast.warning(errorMessage);
    }
  }

  // function backHandler() {
  //   if (window.location.href === `http://localhost:3000/${userRole}`) {  navigate(-1);
  //   } else {
  //     // Go back one page
  //     navigate(-1);
  //   }
  // }

  return (
    <div className="flex pt-5 pb-3 bg-black-blue">
      <div className="flex flex-wrap items-center w-full  justify-evenly rounded-3xl bg-black-blue">
        {/* <Button className="flex justify-between gap-3" onClick={backHandler}>
          {" "}
          <IoArrowBackCircleSharp /> Go Back{" "}
        </Button> */}
        <div className="flex items-center justify-center ml-11 ">
          <h1
            className="flex gap-3 text-2xl font-normal text-white capitalize "
            // onClick={() => navigate("/")}
          >
            <RiAdminLine />
            {/* <LuUserCircle /> */}
            {userRole}
          </h1>
        </div>

        <div className="flex items-center justify-center w-full mb-3  md:w-auto">
          <ul className="flex items-center justify-center p-4 font-medium border border-gray-100 rounded-xl gap-14 ">
            {NavItems[userRole] &&
              NavItems[userRole].map((item, index) => (
                <li
                  className="block px-3 text-xl text-white transition-transform transform rounded cursor-pointer md:border-0 hover:scale-110 md:p-0 dark:text-white "
                  key={index}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-blue-400" : "text-white"
                    }
                    to={{pathname : item.path ,
                      state: { showTable: false }
                    }}
                    
                    end
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <Button onClick={handleLogout}> Log Out </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
