import { useRouter } from 'next/router';
import React from 'react';
import { EmissionsSummaryData } from '../../schema/dashboard.schema';
import { formatWeightToUserUnitPreference } from '../../utils/unitConverter';
import SummaryTile from './SummaryTile';

interface DashboardProps {
  greeting: string;
  emissionsSummaryData: EmissionsSummaryData[] | undefined;
  unitPreference: string;
}

const Dashboard = ({
  greeting,
  emissionsSummaryData,
  unitPreference,
}: DashboardProps) => {
  const router = useRouter();

  const totalEmissions =
    emissionsSummaryData?.reduce((previousValue, current) => {
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

  if (!emissionsSummaryData) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-col justify-between px-5 mb-10 gap-5">
      <h2 className="text-4xl mb-14">{greeting}</h2>
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-2xl mb-5">Your total emissions to date</h2>
        <h2 className="text-xl mb-5 font-bold">
          {formatWeightToUserUnitPreference(unitPreference, totalEmissions)}
        </h2>
      </div>
      <div className="flex justify-center text-center">
        <h4 className="text-2xl mb-5">
          To this date, your total emissions break down as follows
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-5 md:px-10">
        {emissionsSummaryData.map((classification) => {
          return (
            <SummaryTile
              type={classification.type}
              unitPreference={unitPreference}
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
