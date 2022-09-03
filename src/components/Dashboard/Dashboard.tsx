import { Spinner } from 'flowbite-react';
import React from 'react';
import { trpc } from '../../utils/trpc';
import SummaryTile from './SummaryTile';

const Dashboard = () => {
  const dummyData = [
    { type: 'Electricity', emissions: 3000 },
    { type: 'Fuel', emissions: 2000 },
    { type: 'Flight', emissions: 4000 },
    { type: 'Driving', emissions: 6000 },
  ];
  const { data, isLoading } = trpc.useQuery(['dashboard.summary']);

  const totalEmissions = data?.reduce((previousValue, current) => {
    return previousValue + current.emissions;
  }, 0) ?? 0;

  console.log(data, totalEmissions);

  return (
    <div>
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-2xl mb-5">Your total emissions to date</h2>
        <h2 className='text-xl mb-5 font-bold'>{totalEmissions} g</h2>
      </div>
      <div className="flex justify-center text-center">
        <h4 className="text-2xl mb-5">
          To this date, your total emissions break down as follows
        </h4>
      </div>
      <div className="flex flex-wrap justify-around content-around gap-5 max-w-6xl min-w-xl mx-auto">
        {isLoading && !data && <Spinner className='my-20' size='lg'/>}
        {!isLoading && data && data.map((classification) => {
          return (
            <SummaryTile
              type={classification.type}
              emissionsValue={classification.emissions}
              totalEmissions={totalEmissions}
              key={classification.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
