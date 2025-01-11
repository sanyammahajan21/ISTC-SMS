import React, { useState } from "react";
import "./announcements-style.css";
import { IoMdCreate } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import axios from "axios";
import { MdAnnouncement } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { createAnnouncementAPI_Admin } from "../../../Assets/backendAPIs";

function Annoucements() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [textContent, setTextContent] = useState("");

  const [title, setTitle] = useState("");
  
  const navigate=useNavigate();

  const [annoucements, setAnnoucements] = useState("Annoucements");

  function changeHandler(event) {
    setTextContent((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  //Handler Submit
  function handleChange(e) {
    setTextContent(e.target.value);
  }
  function handler2(e) {
    setTitle(e.target.value);
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("content", textContent);

      const url = createAnnouncementAPI_Admin;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploading(false);

      if (response.status == 200) {
        setImageUrl(response.data.imageUrl);
        alert("Announcement created successfully!");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div >
      


      <div className="h-screen overflow-x-hidden overflow-y-hidden bg-lavender text-black-blue background">
        <div className="flex justify-center">
          {/* NavBar */}
          <div className="flex items-center justify-between w-screen h-20 p-4 m-4 bg-white rounded-2xl">
            <h1 className="flex text-4xl font-semibold ">
              Annoucement <MdAnnouncement className="ml-4" />
            </h1>

            <button
              className="pr-4 btn-style "
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IoMdCreate />
              Create new
            </button>
          </div>
        </div>

        {/* Cards in the annoucement section */}
        <div className="flex h-screen gap-4 m-4 rounded-2xl">
          <div className="card-style">
            <h1>Annoucement 1</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quos
              doloremque ducimus esse deserunt, odio inventore? Voluptatem et
              itaque odio laboriosam quas illo ipsa. Quasi culpa adipisci ipsum
              dignissimos facilis odio veniam illo quae deserunt quam. Voluptate
              labore quo debitis amet ex officiis ipsa itaque, saepe eum ratione
              veniam consequatur.
            </p>
          </div>

          <div className="card-style">
            <h1 className="flex">New Annoucement</h1>

            <p>{textContent}</p>
          </div>
        </div>

        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className=" modal-box">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <div className="flex flex-row">
                      <h3 className="flex text-2xl font-semibold">
                        New Annoucement!!
                        <GrAnnounce className="ml-4" />
                      </h3>
                    </div>

                    <button
                      className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>

                  {/* title field */}
                  <div class="mb-6">
                    <label for="large-input" class="font-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      id="large-input"
                      class="block w-full p-4 text-gray-900 border
     border-gray-300 rounded-lg bg-gray-50 text-base
     focus:ring-blue-500 focus:border-blue-500 
      dark:placeholder-gray-400  dark:focus:ring-blue-500
      dark:focus:border-blue-500"
                      placeholder="Enter your title Here"
                      onChange={handler2}
                    ></input>
                  </div>

                  {/*body*/}
                  <div className="relative flex-auto p-6">
                    <form>
                      <textarea
                        className="my-4 text-lg leading-relaxed border-2 text-blueGray-500 text-area "
                        rows={4}
                        cols={65}
                        type="text"
                        placeholder="Enter your content..."
                        onChange={handleChange}
                        name="textarea"
                        variant="soft"
                        color="neutral"
                        value={textContent.newAnnoucement}
                      ></textarea>
                    </form>
                  </div>
                  {/*footer*/}

                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear outline-none text-custom-color background-transparent focus:outline-none active:scale-95"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>

                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-custom-color btn-style active:scale-95 rounded-2xl hover:shadow-lg focus:outline-none"
                      // type="submit"

                      onClick={(e) => {
                        //setShowModal(false);
                        handleUpload();

                        // handleSubmit(e)
                      }}
                    >
                      <FaSave />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Annoucements;
