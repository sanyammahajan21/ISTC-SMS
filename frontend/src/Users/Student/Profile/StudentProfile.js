import React, { useState } from "react";
import StudentProfileForm from "./StudentProfileForm";
import { useNavigate } from "react-router-dom";
function StudentProfile() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  function handleUpload2() {
    setShowProfile(true);

  }
  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">


      <div className="w-screen h-screen">
        {!showProfile ? (<div className="flex items-center justify-center gap-12 mt-64">
          <button
            className="w-[120px] text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue mt-7  "
          // onClick={handleUpload}
          >
            View Profile
          </button>


          <button
            className="w-[120px] text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue mt-7  "
            onClick={handleUpload2}
          >
            Edit Profile
          </button></div>) : (<StudentProfileForm></StudentProfileForm>)


        }


      </div>
    </div>
  );
}

export default StudentProfile;
