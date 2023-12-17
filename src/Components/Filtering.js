import React from "react";

const Filtering = ({ startUps, onFilterChange, filters, onLocationfilter}) => {

  const uniqueInvestment = [
    ...new Set(startUps.map((startup) => startup.InvestmentType)),
  ];
  const uniqueLocation = [
    ...new Set(startUps.map((startup) => startup.CityLocation)),
  ];

  const handleInvestmentChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };
  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    onLocationfilter(selectedValue);
  };

  return (
    <div className=" flex flex-col sm:flex-row justify-center items-center">
      <label className="block text-white mx-2 font-semibold md:text-lg">
        Investment Type:
      </label>
      <select
        className="mt-1 sm:mt-0 p-1 md:p-2 border border-gray-300 rounded-md bg-gray-200"
        value={filters.investmentFilter}
        onChange={handleInvestmentChange}
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
      <label className="block text-white mx-2 font-semibold md:text-lg">
      City Location :
      </label>
      <select
        className="mt-1 sm:mt-0 p-1 md:p-2 border border-gray-300 rounded-md bg-gray-200"
        value={filters.locationFilter}
        onChange={handleLocationChange}
      >
        <option value="">Any Location</option>
        {uniqueLocation
          .filter((location) => location && location.trim() !== "") 
          .map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filtering;
