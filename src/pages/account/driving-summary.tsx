import { Accordion, Button, Tabs } from 'flowbite-react';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import VehicleTripTable from '../../components/Account/VehicleTripTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const DrivingSummaryPage: NextPageWithLayout = () => {
  const { data: vehiclesWithTripsData, isLoading } = trpc.useQuery([
    'dashboard.get-vehicle-trip-data',
  ]);

  if (!vehiclesWithTripsData) {
    return <LoadingSpinner />;
  }

  if (vehiclesWithTripsData.length === 0) {
    return (
      <>
        <Head>
          <title>Driving Summary</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <p className="text-2xl mb-6 ml-2 md:ml-10">Your Driving Emissions</p>
        <div className="flex flex-col items-center gap-4 text-center">
          <strong>{'You haven\'t recorded any driving data.'}</strong>
          <p>You can make your emissions calculation here:</p>
          <Button size="sm">
            <Link href="/travel">Make a new calculation</Link>
          </Button>
        </div>
      </>
    );
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
              <Accordion.Panel key={entry.id}>
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
