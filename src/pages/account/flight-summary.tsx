import React, { ReactElement } from 'react';
import FlightTable from '../../components/Account/FlightTable';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const FlightSummaryPage: NextPageWithLayout = () => {
  const { data: flightData } = trpc.useQuery(['dashboard.get-flight-data']);

  return (
    <div>
      <p className='text-2xl mb-6 ml-2 md:ml-10'>Your Flight Emissions</p>
      <FlightTable flightData={flightData} />
    </div>
  );
};

FlightSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default FlightSummaryPage;
