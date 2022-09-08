import { Spinner, Tabs } from 'flowbite-react';
import React, { ReactElement } from 'react';
import VehicleTripTable from '../../components/Account/VehicleTripTable';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const DrivingSummaryPage: NextPageWithLayout = () => {
  const { data: vehiclesWithTripsData } = trpc.useQuery([
    'dashboard.get-vehicle-trip-data',
  ]);

  if (!vehiclesWithTripsData) {
    return <Spinner />;
  }

  console.log(vehiclesWithTripsData!);
  return (
    <div>
      <Tabs.Group aria-label="Full width tabs" style="underline">
        {vehiclesWithTripsData.map((entry) => {
          return (
            <Tabs.Item
              title={[
                entry.vehicle_year,
                entry.vehicle_make,
                entry.vehicle_model,
              ].join(' ')}
              key={entry.id}
            >
              <VehicleTripTable tripData={entry.trips} />
            </Tabs.Item>
          );
        })}
        {/* <Tabs.Item title="Profile">Profile content</Tabs.Item>
        <Tabs.Item title="Dashboard"></Tabs.Item>
        <Tabs.Item title="Settings">Settings content</Tabs.Item>
        <Tabs.Item title="Invoice">Invoice content</Tabs.Item> */}
      </Tabs.Group>
    </div>
  );
};

DrivingSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default DrivingSummaryPage;
