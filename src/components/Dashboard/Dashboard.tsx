import React from 'react';
import SummaryTile from './SummaryTile';

const Dashboard = () => {
  const data = [
    { type: 'Power', emissions: 3000 },
    { type: 'Fuel', emissions: 2000 },
    { type: 'Flight', emissions: 4000 },
    { type: 'Driving', emissions: 6000 },
  ];

  return (
    <div>
      <div className='flex justify-center text-center'>
        <h2 className='text-2xl mb-5'>Your total emissions to date</h2>
        
      </div>
      <div className="flex justify-center text-center">
        <h4 className="text-2xl mb-5">
          To this day, your total emissions break down as follows
        </h4>
      </div>
      <div className="flex flex-wrap justify-around content-around gap-5">
        {data.map((classification) => {
          return (
            <SummaryTile
              type={classification.type}
              emissionsValue={classification.emissions}
              key={classification.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
