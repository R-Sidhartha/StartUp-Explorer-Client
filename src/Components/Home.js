import React, { useContext, useEffect, useState } from "react";
import Filtering from "./Filtering";
import StartUpContext from "../Context/StartUpContext";
import AllStartUps from "./AllStartUps";
import Pagination from "./Pagination";
import loading from "./loading.gif";
import CreateStartUp from "./CreateStartUp";
const Home = () => {
  const context = useContext(StartUpContext);
  const { StartUps, getStartUps, deleteStartUp, createStartUp } = context;
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startupsPerPage = 20;
  const [Loading, setLoading] = useState(true);
  const [ShowCreateModal, setShowCreateModal] = useState(false);
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
    if (selectedFilter === "") {
      setFilteredStartups(StartUps);
    } else {
      const filteredData = StartUps.filter(
        (startup) => startup.InvestmentType === selectedFilter
      );
      setFilteredStartups(filteredData);
    }
    setCurrentPage(1); // Reset current page when filter changes
  };
  const DeleteStartUp = async (startUpId) => {
    try {
      setLoading(true)
      await deleteStartUp(startUpId);
    } catch (error) {
      console.error("Error deleting StartUp:", error);
  } finally {
    setLoading(false);
  }
  };
  const handleCreateStartUp=(startUpData)=>{
    createStartUp(startUpData)
    setShowCreateModal(false)
  }
  useEffect(() => {
    setFilteredStartups(StartUps);
  }, [StartUps]);

  const handleCreate=()=>{
    setShowCreateModal(true)
  }

  const indexOfLastStartup = currentPage * startupsPerPage;
  const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
  const currentStartups = filteredStartups.slice(
    indexOfFirstStartup,
    indexOfLastStartup
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <div >
        <h2 className="text-3xl text-center my-5 font-bold">StartUp List</h2>
        <div className="flex flex-col justify-center">
        <div className="flex justify-center items-center mb-4">
          <div>
            <Filtering
              startUps={StartUps}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div>
            <button className="mx-12 bg-gray-300 p-2 hover:opacity-60 rounded-md font-semibold mt-6 sm:mt-0" onClick={handleCreate}>
              Create New{" "}
            </button>
          </div>
        </div>
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
          <CreateStartUp setShowCreateModal={setShowCreateModal} onCreateStartUp={handleCreateStartUp}/>
        </div>
      )}
    </div>
  );
};
export default Home;
