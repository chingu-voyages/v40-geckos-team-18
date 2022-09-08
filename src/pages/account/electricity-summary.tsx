import Head from 'next/head';
import React, { ReactElement } from 'react';
import ElectricityTable from '../../components/Account/ElectricityTable';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const ElectricitySummaryPage: NextPageWithLayout = () => {
  const { data: electricityData } = trpc.useQuery([
    'dashboard.get-electicity-data',
  ]);

  return (
    <div>
      <Head>
        <title>Electricity Summary</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <p className="text-2xl mb-6 ml-2 md:ml-10">Your Electricity Emissions</p>
      <ElectricityTable electricityData={electricityData} />
    </div>
  );
};

ElectricitySummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default ElectricitySummaryPage;
