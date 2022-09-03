import React, { ReactElement } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const ElectricitySummaryPage: NextPageWithLayout = () => {
  return <div>ElectricitySummaryPage</div>;
};

ElectricitySummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default ElectricitySummaryPage;
