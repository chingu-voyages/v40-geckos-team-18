import React, { ReactElement } from 'react'
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app'

const FlightSummaryPage: NextPageWithLayout = () => {
  return (
    <div>FlightSummary</div>
  )
}

FlightSummaryPage.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
  };
export default FlightSummaryPage