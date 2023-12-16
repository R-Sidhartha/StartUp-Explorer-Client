import React from 'react';

const SearchBar = ({ startUps, setFilteredStartups, clearSearch, searchQuery, setSearchQuery }) => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredStartUps = startUps.filter((startUp) =>
      startUp.StartupName.toLowerCase().includes(query)
    );

    setFilteredStartups(filteredStartUps);
  };

  return (
    <div className='flex justify-center'>
      <div className='border border-gray-400 rounded-md w-11/12 lg:w-1/2 flex relative'>
        <input
          type='text'
          className='p-2 w-full bg-gray-200 rounded-md'
          name='search'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Search by startup name...'
        />
        {searchQuery && (
          <button
            className=' absolute right-2 top-2'
            onClick={clearSearch}
          >
           <i className="fa-solid fa-xmark cursor-pointer hover:opacity-70  text-gray-500"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

