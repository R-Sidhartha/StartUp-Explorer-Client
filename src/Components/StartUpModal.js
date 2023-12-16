import React from "react";

const StartUpModal = ({ startUp, setShowModal, formatCustomDate}) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 w-full h-full absolute"></div>
      <div className="modal-container w-4/5 h-3/4  rounded shadow-lg z-50 overflow-y-auto relative bg-white">
        <div className="modal-content p-4 w-full h-full">
          <span
            className="close-button absolute top-3 right-4 text-gray-600"
            onClick={closeModal}
          >
            <i className="fa-solid fa-circle-xmark cursor-pointer hover:opacity-70 fa-lg"></i>
          </span>
          <div className="flex flex-col md:flex-row justify-center p-3 h-full">
            <div className={`flex flex-col bg-cover bg-search-bg justify-center items-center md:w-2/3 h-full mx-3`}>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {startUp.StartupName || "N/A"}
              </h2>
              <p className="mb-2">
                <strong>Industry Vertical:</strong> {startUp.IndustryVertical || "N/A"}
              </p>
              <p className="mx-4">
                <strong>SubVertical:</strong> {startUp.SubVertical || "N/A"}
              </p>
            </div>
            <div className="md:w-1/3 mt-10 h-5/6">
                <h2 className="text-center text-lg font-semibold">StartUp Details</h2>
              <div className="text-gray-700 my-3 font-semibold">
                Investors:
                <ul className="list-disc list-inside grid grid-cols-2">
                  {startUp.InvestorsName.split(",").map((investor, index) => (
                    <li
                      key={index}
                      className="text-gray-500 flex items-center text-sm my-1"
                    >
                      <i className="fas fa-user mr-2"></i>
                      {investor.trim()}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mt-5 text-lg md:text-base font-semibold">
                Investment Type:{" "}
                <span className="text-gray-600 mx-2">{startUp.InvestmentType || "N/A"}</span>
              </p>
                <div className="my-3">
                  <span>
                    <i className="fa-solid fa-location-dot text-red-500"></i>
                  </span>{" "}
                  <span className="text-gray-500">{startUp.CityLocation || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                <p className="text-gray-700 my-2 text-sm md:text-base rounded-lg">
                  <span>
                    <span className="text-lg text-black">Fund:</span>
                  </span>
                  <span className="text-gray-700 mx-1 ">
                    {startUp.AmountInUSD || "N/A"}
                    <span>
                      <i className="fa-solid fa-dollar-sign fa-sm mx-1"></i>
                    </span>
                  </span>
                </p>
                <div className="my-3">
                  <span>
                    <i className="fa-solid fa-calendar-days mr-1"></i>
                  </span>
                  <span>{formatCustomDate(startUp.Date) || "N/A"}</span>
                </div>
                </div>
                <p className="text-gray-700 my-3 text-sm md:text-base rounded-lg">
                  <span className="text-lg text-black">
                    Remarks:
                  </span>
                  <span className="text-gray-700 mx-1 ">
                    {startUp.Remarks || "N/A"}
                  </span>
                </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default StartUpModal;
