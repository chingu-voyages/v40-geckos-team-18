import React, { ReactElement } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const FuelSummaryPage: NextPageWithLayout = () => {
  return <div>FuelSummaryPage</div>;
};

FuelSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default FuelSummaryPage;
