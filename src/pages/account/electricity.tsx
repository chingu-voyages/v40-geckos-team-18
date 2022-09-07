import React, { ReactElement } from 'react';
import ElectricityTable from '../../components/Account/ElectricityTable';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const ElectricitySummaryPage: NextPageWithLayout = () => {
  return (
    <div className='px-10'>
      <ElectricityTable />
    </div>
  );
};

ElectricitySummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default ElectricitySummaryPage;
