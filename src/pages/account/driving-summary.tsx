import { Accordion, Tabs } from 'flowbite-react';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import VehicleTripTable from '../../components/Account/VehicleTripTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const DrivingSummaryPage: NextPageWithLayout = () => {
  const { data: vehiclesWithTripsData } = trpc.useQuery([
    'dashboard.get-vehicle-trip-data',
  ]);

  if (!vehiclesWithTripsData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Driving Summary</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <p className="text-2xl mb-6 ml-2 md:ml-10">Your Driving Emissions</p>
      <div className="md:px-10 hidden sm:block">
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
        </Tabs.Group>
      </div>
      <div className="md:hidden px-2">
        <Accordion>
          {vehiclesWithTripsData.map((entry) => {
            return (
              <Accordion.Panel>
                <Accordion.Title>
                  <p className="text-gray-900">
                    {[
                      entry.vehicle_year,
                      entry.vehicle_make,
                      entry.vehicle_model,
                    ].join(' ')}
                  </p>
                </Accordion.Title>
                <Accordion.Content>
                  <VehicleTripTable tripData={entry.trips} />
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

DrivingSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default DrivingSummaryPage;
