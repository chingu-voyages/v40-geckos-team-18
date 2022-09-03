import React, { ReactElement } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const DrivingSummaryPage: NextPageWithLayout = () => {
  return <div>DrivingSummaryPage</div>;
};

DrivingSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default DrivingSummaryPage;
