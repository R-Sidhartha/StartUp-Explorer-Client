import React from 'react';
import StartUpCard from './StartUpCard';

const AllStartUps = ({ startUps,DeleteStartUp }) => {


  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {startUps.map((startUp, index) => (
          <StartUpCard key={index} startUp={startUp} DeleteStartUp={DeleteStartUp}/>
        ))}
      </div>
    </div>
  );
};

export default AllStartUps;
