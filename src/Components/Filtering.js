import React, { useState } from "react";

const Filtering = ({ startUps, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const uniqueInvestment = [
    ...new Set(startUps.map((startup) => startup.InvestmentType)),
  ];

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <div className=" flex flex-col sm:flex-row justify-center items-center">
      <label className="block text-gray-700 mx-2 font-semibold">
        Investment Type:
      </label>
      <select
        className="mt-1 p-2 border border-gray-300 rounded-md"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">All Investments</option>
        {uniqueInvestment
          .filter((investment) => investment && investment.trim() !== "") // Filter out null or empty investment types
          .map((investment, index) => (
            <option key={index} value={investment}>
              {investment}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filtering;