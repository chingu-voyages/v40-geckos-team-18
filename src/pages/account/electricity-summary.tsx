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
      <ElectricityTable electricityData={electricityData} />
    </div>
  );
};

ElectricitySummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default ElectricitySummaryPage;
