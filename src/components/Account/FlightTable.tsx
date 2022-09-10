import { Button, Spinner, Table } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { FlightData } from '../../schema/dashboard.schema';
import { FlightLegData } from '../../schema/flight.schema';
import { trpc } from '../../utils/trpc';

interface FlightTableProps {
  flightData: FlightData[] | undefined
}
const FlightTable = ({flightData}: FlightTableProps) => {

  const flightDataDatesDesc = () => {
    const dataToBeSorted = [...flightData!];
    if (flightData)
      return dataToBeSorted.sort(
        (a, b) => b.estimated_at.valueOf() - a.estimated_at.valueOf()
      );
  };

  if (!flightData) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const getFlightLegs = (flightLegs: FlightLegData[]) => {
    return (
      <div className="flex flex-col">
        {flightLegs.map((leg) => {
          return (
            <div
              className="flex flex-row gap-2 items-center justify-between"
              key={leg.id}
            >
              <div className="flex flex-row gap-2 items-center">
                <p>{leg.cabin_class === 'economy' ? 'Economy:' : 'Premium:'}</p>{' '}
                <p> {leg.departure_airport}</p>
                <HiArrowRight />
                <p>{leg.destination_airport}</p>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="px-2 sm:px-10">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell className="hidden md:table-cell">
            Passengers
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Trip Info
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Emissions
          </Table.HeadCell>
          <Table.HeadCell className="sm:hidden">
            <div className="text-end">
              <p>Trip Summary</p>
              <strong>Emissions</strong>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {flightData.length !== 0 ? (
            flightDataDatesDesc()!.map((entry) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={entry.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>{entry.estimated_at.toLocaleDateString()}</p>
                    <p>{entry.estimated_at.toLocaleTimeString()}</p>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden md:table-cell">
                    <p>{entry.passengers}</p>
                  </Table.Cell>
                  {/** Todo: update this to use the users unit preference */}
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>
                      <p className="mb-2 md:hidden">
                        {entry.passengers}{' '}
                        {entry.passengers > 1 ? 'passengers' : 'passenger'}
                      </p>
                      {getFlightLegs(entry.flightLeg)}
                    </>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>{entry.carbon_g / 1000.0}kg</>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 flex flex-col dark:text-white text-end sm:hidden">
                    <>
                      <p>
                        {entry.passengers}{' '}
                        {entry.passengers > 1 ? 'passengers' : 'passenger'}
                      </p>
                      {entry.flightLeg.length}{' '}
                      {entry.flightLeg.length > 1 ? 'stops' : 'stop'}
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
      {flightData.length === 0 ? (
        <div className="flex flex-col items-center pt-10 gap-4">
          <strong>{'You haven\'t recorded any flight data.'}</strong>
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

export default FlightTable;
