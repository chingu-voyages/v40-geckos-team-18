import { Spinner } from 'flowbite-react';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../../utils/trpc';
import SummaryTile from './SummaryTile';

interface DashboardProps {
  greeting: string;
}
const Dashboard = ({ greeting }: DashboardProps) => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(['dashboard.summary']);

  const totalEmissions =
    data?.reduce((previousValue, current) => {
      return previousValue + current.emissions;
    }, 0) ?? 0;

  const handleOnClickTile = (type: string) => {
    switch (type) {
      case 'Electricity':
        return router.push('/account/electricity-summary');
      case 'Driving':
        return router.push('/account/driving-summary');
      case 'Fuel':
        return router.push('/account/fuel-summary');
      case 'Flight':
        return router.push('/account/flight-summary');
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col justify-between px-5 mb-10 gap-5">
      <h2 className="text-4xl mb-14">{greeting}</h2>
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-2xl mb-5">Your total emissions to date</h2>
        <h2 className="text-xl mb-5 font-bold">{totalEmissions} g</h2>
      </div>
      <div className="flex justify-center text-center">
        <h4 className="text-2xl mb-5">
          To this date, your total emissions break down as follows
        </h4>
      </div>
      {/* <div className="flex flex-wrap justify-around content-around gap-5 max-w-6xl min-w-xl mx-auto"> */}
      <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-5 md:px-10'>
        {isLoading && !data && <Spinner className="my-20" size="lg" />}
        {!isLoading &&
          data &&
          data.map((classification) => {
            return (
              <SummaryTile
                type={classification.type}
                emissionsValue={classification.emissions}
                totalEmissions={totalEmissions}
                key={classification.type}
                handleOnClick={() => handleOnClickTile(classification.type)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
