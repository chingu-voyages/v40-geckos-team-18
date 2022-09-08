import React, { ReactElement } from 'react';
import FuelTable from '../../components/Account/FuelTable';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const FuelSummaryPage: NextPageWithLayout = () => {
  return <div><FuelTable /></div>;
};

FuelSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default FuelSummaryPage;
