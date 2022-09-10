import React from 'react';
import { Button, Spinner, Table } from 'flowbite-react';
import Link from 'next/link';
import { TripData } from '../../schema/dashboard.schema';

interface VehicleTripTableProps {
  tripData: TripData[];
}

const VehicleTripTable = ({ tripData }: VehicleTripTableProps) => {
  const tripDataDatesDesc = () => {
    const dataToBeSorted = [...tripData!];
    if (tripData)
      return dataToBeSorted.sort(
        (a, b) => b.estimated_at.valueOf() - a.estimated_at.valueOf()
      );
  };

  if (!tripData) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-10">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Distance Traveled
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Emissions
          </Table.HeadCell>
          <Table.HeadCell className="sm:hidden">
            <div className="text-end">
              <p>Distance Traveled</p>
              <strong>Emissions</strong>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tripData.length !== 0 ? (
            tripDataDatesDesc()!.map((entry) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={entry.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>{entry.estimated_at.toLocaleDateString()}</p>
                    <p>{entry.estimated_at.toLocaleTimeString()}</p>
                  </Table.Cell>
                  {/** Todo: update this to use the users unit preference */}
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>
                      {entry.distance_value} {entry.distance_unit}
                    </>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>{entry.carbon_g / 1000.0}kg</>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 flex flex-col dark:text-white text-end sm:hidden">
                    <>
                      {entry.distance_value} {entry.distance_unit}
                      <strong>{entry.carbon_g / 1000.0}kg</strong>
                    </>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <div></div>
          )}
        </Table.Body>
      </Table>
      {tripData.length === 0 ? (
        <div className="flex flex-col items-center pt-10 gap-4 text-center">
          <strong>{"You haven't recorded any driving data."}</strong>
          <p>You can make your emissions calculation here:</p>
          <Button size="sm">
            <Link href="/travel">Make a new calculation</Link>
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default VehicleTripTable;
