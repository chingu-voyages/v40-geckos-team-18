import React, { ReactElement } from 'react'
import FlightTable from '../../components/Account/FlightTable';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app'

const FlightSummaryPage: NextPageWithLayout = () => {
  return (
    <div><FlightTable /></div>
  )
}

FlightSummaryPage.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
  };
export default FlightSummaryPage