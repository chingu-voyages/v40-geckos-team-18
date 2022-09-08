import React, { ReactElement } from 'react';
import FlightTable from '../../components/Account/FlightTable';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const FlightSummaryPage: NextPageWithLayout = () => {
  const { data: flightData } = trpc.useQuery(['dashboard.get-flight-data']);

  return (
    <div>
      <FlightTable flightData={flightData} />
    </div>
  );
};

FlightSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default FlightSummaryPage;
