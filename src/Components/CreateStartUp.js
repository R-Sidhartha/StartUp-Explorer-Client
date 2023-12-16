import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateStartUp = ({ onCreateStartUp, setShowCreateModal }) => {
  const initialFormData = {
    StartupName: "",
    IndustryVertical: "",
    SubVertical: "",
    CityLocation: "",
    Date: new Date(),
    InvestorsName: [""],
    InvestmentType: "",
    AmountInUSD: "",
    Remarks: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedInvestorsName = formData.InvestorsName.join(", ");
    const updatedStartupData = {
      ...formData,
      InvestorsName: combinedInvestorsName,
    };
    onCreateStartUp(updatedStartupData);
    console.log(updatedStartupData);
    setFormData(initialFormData);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "InvestorsName") {
      // Update the specific investor name in the array
      const updatedInvestorsName = [...formData.InvestorsName];
      updatedInvestorsName[index] = value;

      setFormData((prevData) => ({
        ...prevData,
        InvestorsName: updatedInvestorsName,
      }));
    } 
     else {
      // Handle other form fields
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      Date: date, // Assuming "Date" is the name of your date field in formData
    }));
  };
  const handleAddInvestor = () => {
    // Add a new empty string to the InvestorsNames array
    setFormData((prevData) => ({
      ...prevData,
      InvestorsName: [...prevData.InvestorsName, ""],
    }));
  };
  const removeInvestor = (index) => {
    const updatedInvestors = [...formData.InvestorsName];
    updatedInvestors.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      InvestorsName: updatedInvestors,
    }));
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };
  return (
    <div className="fixed top-0 h-full w-full flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 w-full h-full absolute"></div>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-7/12 mx-auto p-6 bg-gray-800 shadow-md rounded-md relative top-12"
      >
        <h2 className="mb-5 text-xl font-bold text-center text-white">
          StartUp Details
        </h2>
        <div className="flex justify-between">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="StartupName"
              className="block text-gray-200 font-bold mb-2"
            >
              Startup Name:
              <span>
                <i className="fa-solid fa-asterisk fa-2xs text-red-400 mx-1"></i>
              </span>
            </label>
            <input
              type="text"
              id="StartupName"
              name="StartupName"
              value={formData.StartupName}
              onChange={handleChange}
              minLength={3}
              required
              placeholder="Startup Name"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>
          <div className="mb-4 w-1/2 ml-2">
            <label
              htmlFor="StartupName"
              className="block text-gray-200 font-bold mb-2"
            >
              IndustryVertical:
            </label>
            <input
              type="text"
              id="IndustryVertical"
              name="IndustryVertical"
              value={formData.IndustryVertical}
              onChange={handleChange}
              placeholder="Startup Name"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="StartupName"
              className="block text-gray-200 font-bold mb-2"
            >
              SubVertical:
            </label>
            <input
              type="text"
              id="SubVertical"
              name="SubVertical"
              value={formData.SubVertical}
              onChange={handleChange}
              placeholder="Startup Name"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>
          <div className="mb-4 w-1/2 ml-2">
            <label
              htmlFor="StartupName"
              className="block text-gray-200 font-bold mb-2"
            >
              CityLocation:
              <span>
                <i className="fa-solid fa-asterisk fa-2xs text-red-400 mx-1"></i>
              </span>
            </label>
            <input
              type="text"
              id="CityLocation"
              name="CityLocation"
              value={formData.CityLocation}
              onChange={handleChange}
              minLength={3}
              required
              placeholder="Startup Name"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="InvestmentType"
              className="block text-gray-200 font-bold mb-2"
            >
              Investment Type:
              <span>
                <i className="fa-solid fa-asterisk fa-2xs text-red-400 mx-1"></i>
              </span>
            </label>
            <input
              type="text"
              id="InvestmentType"
              name="InvestmentType"
              value={formData.InvestmentType}
              onChange={handleChange}
              minLength={3}
              required
              placeholder="seed functing etc..."
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>

          <div className="mb-4 w-1/2 ml-2">
            <label
              htmlFor="AmountInUSD"
              className="block text-gray-200 font-bold mb-2"
            >
              Amount In USD:
              <span>
                <i className="fa-solid fa-asterisk fa-2xs text-red-400 mx-1"></i>
              </span>
            </label>
            <input
              type="text"
              id="AmountInUSD"
              name="AmountInUSD"
              value={formData.AmountInUSD}
              onChange={handleChange}
              minLength={3}
              required
              placeholder="example 100,000"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:w-2/3">
          {formData.InvestorsName.map((investorName, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`InvestorsName-${index}`}
                className="block text-gray-200 font-bold mb-2"
              >
                Investor {index + 1}:
                <span>
                  <i className="fa-solid fa-asterisk fa-2xs text-red-400 mx-1"></i>
                </span>
              </label>

              <div className="flex">
                <div className="relative">
                  <input
                    type="text"
                    id={`InvestorsName-${index}`}
                    name="InvestorsName"
                    value={investorName}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Investor Name"
                    className="flex-1 p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700 mr-2 text-sm"
                  />
                  {index !== 0 && (
                    <button
                      className="hover:opacity-70 mr-4 absolute right-0 top-1"
                      onClick={() => removeInvestor(index)}
                    >
                      <i className="fa-solid fa-trash fa-2xs text-red-400"></i>
                    </button>
                  )}
                </div>
                {index === formData.InvestorsName.length - 1 && (
                  <button
                    type="button"
                    className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none active:bg-indigo-800"
                    onClick={handleAddInvestor}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="Date" className="block text-gray-200 font-bold mb-2">
            Date:
          </label>
          <DatePicker
            selected={formData.Date} 
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
          />
        </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Remarks"
            className="block text-gray-200 font-bold mb-2"
          >
            Remarks:
          </label>
          <textarea
            id="Remarks"
            name="Remarks"
            value={formData.Remarks}
            placeholder="Any remarks"
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-none text-gray-200 focus:border-gray-300 bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
        >
          Create StartUp
        </button>
        <button
          className=" p-1 rounded-xl hover:opacity-70 absolute top-2 right-2"
          onClick={handleCloseModal}
        >
          <i className="fa-regular fa-circle-xmark fa-lg opacity-80 text-white"></i>
        </button>
      </form>
    </div>
  );
};

export default CreateStartUp;
