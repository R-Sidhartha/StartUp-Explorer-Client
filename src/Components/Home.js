import React, { useCallback, useContext, useEffect, useState } from "react";
import Filtering from "./Filtering";
import StartUpContext from "../Context/StartUpContext";
import AllStartUps from "./AllStartUps";
import Pagination from "./Pagination";
import loading from "./Pics/loading.gif";
import CreateStartUp from "./CreateStartUp";
import SearchBar from "./SearchBar";
const Home = () => {
  const context = useContext(StartUpContext);
  const { StartUps, getStartUps, deleteStartUp, createStartUp } = context;
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startupsPerPage = 20;
  const [Loading, setLoading] = useState(true);
  const [ShowCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    investmentFilter: '',
    locationFilter: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getStartUps();
      } catch (error) {
        console.error("Error fetching StartUps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (selectedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      investmentFilter: selectedFilter,
    }));
    setCurrentPage(1); // Reset current page when filter changes
  };
  const handleLocationFilterChange = (selectedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      locationFilter: selectedFilter,
    }));
    setCurrentPage(1); 
  };

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);

      const filteredData = StartUps.filter((startup) => {
        const investmentTypeMatch =
          filters.investmentFilter === "" ||
          startup.InvestmentType === filters.investmentFilter;

        const locationMatch =
          filters.locationFilter === "" ||
          startup.CityLocation === filters.locationFilter;

        const searchMatch = startup.StartupName.toLowerCase().includes(
          query.toLowerCase()
        );

        return investmentTypeMatch && locationMatch && searchMatch;
      });

      setFilteredStartups(filteredData);
    },
    [filters.investmentFilter, filters.locationFilter, StartUps]
  );

  const clearSearch = () => {
    setSearchQuery("");
    handleSearch("");
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, filters.investmentFilter, filters.locationFilter, StartUps,handleSearch]);

  const DeleteStartUp = async (startUpId) => {
    try {
      setLoading(true);
      await deleteStartUp(startUpId);
    } catch (error) {
      console.error("Error deleting StartUp:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateStartUp = (startUpData) => {
    createStartUp(startUpData);
    setShowCreateModal(false);
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const indexOfLastStartup = currentPage * startupsPerPage;
  const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
  const currentStartups = filteredStartups.slice(
    indexOfFirstStartup,
    indexOfLastStartup
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <div>
        <div className="flex flex-col h-full">
          <div className="bg-search-bg bg-cover mb-3 h-96 flex flex-col items-center justify-center">
            <div className="w-11/12 sm:w-3/4">
              <div className="flex justify-center items-center sm:items-start flex-col my-4">
              <h2 className="text-3xl text-white my-1 font-bold">StartUp Explorer</h2>
              <span className="text-sm">"Startups light up tomorrow with bold ideas and small beginnings. Each step forward brings a brighter, better future."</span>
              </div>
              <SearchBar
                startUps={StartUps}
                setFilteredStartups={setFilteredStartups}
                clearSearch={clearSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="flex justify-end w-11/12 items-center mt-4">
              <div>
                <Filtering
                  startUps={StartUps}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                  onLocationfilter={handleLocationFilterChange}
                />
              </div>
              <div>
                <button
                  className="mx-12 bg-gray-200 p-2 hover:opacity-60 rounded-md font-semibold mt-6 sm:mt-0"
                  onClick={handleCreate}
                >
                  Create New{" "}
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-3xl text-center mb-8 font-semibold">
                StartUp List
              </h2>
          <div className="flex flex-col justify-center ">
            {Loading ? (
              <div className="flex justify-center">
                <img className="w-10" src={loading} alt="" />
              </div>
            ) : (
              <div>
                <AllStartUps
                  startUps={currentStartups}
                  DeleteStartUp={DeleteStartUp}
                />
                <Pagination
                  startupsPerPage={startupsPerPage}
                  totalStartups={filteredStartups.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {ShowCreateModal && (
        <div className="absolute w-full flex justify-center top-0 z-50 h-2/3">
          <CreateStartUp
            setShowCreateModal={setShowCreateModal}
            onCreateStartUp={handleCreateStartUp}
          />
        </div>
      )}
    </div>
  );
};
export default Home;
