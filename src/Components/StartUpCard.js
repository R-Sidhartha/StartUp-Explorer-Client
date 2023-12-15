import React, { useState } from "react";
import StartUpModal from "./StartUpModal";
import ConfirmModal from "./ConfirmModal";

const StartUpCard = ({ startUp, DeleteStartUp }) => {
  const [ShowModal, setShowModal] = useState(false);
  const [ShowDeleteModal,setShowDeleteModal]=useState(false)
  
  const handleCancelDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  function formatCustomDate(dateString) {
    // Check if the string matches the specific format
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (regex.test(dateString)) {
      // If it matches, parse it and format as "dd/MM/yyyy"
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } else {
      return dateString;
    }
  }
  const handleRemove = () => {
    setShowModal(false)
    DeleteStartUp(startUp._id);
  };
  return (
    <div className="relative group">
      <div
        className="bg-white rounded-md p-4 shadow-lg mt-8 sm:mt-4 relative z-10"
        
      >
        <span className="text-2xl font-bold text-center block mb-2">
          {startUp.StartupName || "N/A"}
        </span>
        <span className="text-gray-600 text-center block h-5">
          <span className="text-sm">{startUp.IndustryVertical || "N/A"}</span>
        </span>
        <span className="text-yellow-700 text-center block">
          <span className="text-xs">({startUp.SubVertical || "N/A"})</span>
        </span>
        <div className="text-gray-700 my-1 text-sm md:text-base">
          <div>
            <span>
              <i className="fa-solid fa-location-dot text-red-500"></i>
            </span>{" "}
            <span className="text-gray-500">
              {startUp.CityLocation || "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <p className="text-gray-700 my-2 text-sm md:text-base rounded-lg">
            <span>
              <i className="fa-solid fa-sack-dollar mr-1 text-violet-600"></i>
              Fund:
            </span>
            <span className="text-gray-500 mx-1 ">
              {startUp.AmountInUSD || "N/A"}
              <span>
                <i className="fa-solid fa-dollar-sign fa-sm mx-1"></i>
              </span>
            </span>
          </p>
          <div>
            <span>
              <i className="fa-solid fa-calendar-days mx-1"></i>
            </span>
            <span>
              <span>{formatCustomDate(startUp.Date) || "N/A"}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-80 rounded-md p-4 lg:flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 hidden">
        <button className=" text-white px-4 py-2 mr-2 hover:opacity-60" onClick={handleOpenModal}>
        <i className="fa-solid fa-eye fa-xl "></i>
        </button>
        <button className=" hover:opacity-60 px-4 py-2" onClick={handleDelete}><i className="fa-solid fa-trash  text-red-600 fa-xl"></i></button>
      </div>
      <div className="absolute top-0 right-0 z-40 lg:hidden">
      <button className=" text-green-700 p-2 mx-3 hover:opacity-60" onClick={handleOpenModal}>
        <i className="fa-solid fa-eye fa-sm "></i>
        </button>
        <button className=" hover:opacity-60 p-2" onClick={handleDelete}><i className="fa-solid fa-trash  text-red-600 fa-sm"></i></button>
      </div>
      {ShowModal && (
        <div className="absolute w-full flex justify-center z-50 h-2/3">
          <StartUpModal
            startUp={startUp}
            setShowModal={setShowModal}
            DeleteStartUp={DeleteStartUp}
            formatCustomDate={formatCustomDate}
          />
        </div>
      )}
      {ShowDeleteModal&&
      <div className="absolute z-50 top-0 h-full">
      <ConfirmModal
      title="Delete StartUp Card ?"
      message="Are you sure, you want to DELETE this StartUp Card from List?"
      handleCancelDelete={handleCancelDelete}
      handleConfirmDelete={handleRemove}
      handleDelete={handleDelete}
    />
    </div>
      }
    </div>
  );
};

export default StartUpCard;
