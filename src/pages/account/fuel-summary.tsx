import React, { ReactElement } from 'react';
import FuelTable from '../../components/Account/FuelTable';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const FuelSummaryPage: NextPageWithLayout = () => {
  const { data: fuelData } = trpc.useQuery(['dashboard.get-fuel-data']);

  return (
    <div>
      <FuelTable fuelData={fuelData} />
    </div>
  );
};

FuelSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default FuelSummaryPage;
