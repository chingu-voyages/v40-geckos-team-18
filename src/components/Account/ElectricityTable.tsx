import { Button, Spinner, Table } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { ElectricityData } from '../../schema/dashboard.schema';

interface ElectricityTableProps {
  electricityData: ElectricityData[] | undefined;
}

const ElectricityTable = ({ electricityData }: ElectricityTableProps) => {
  const electricityDataDatesDesc = () => {
    const dataToBeSorted = [...electricityData!];
    if (electricityData)
      return dataToBeSorted.sort(
        (a, b) => b.estimated_at.valueOf() - a.estimated_at.valueOf()
      );
  };

  if (!electricityData) {
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
            Electricity Used
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Emissions
          </Table.HeadCell>
          <Table.HeadCell className="sm:hidden">
            <div className="text-end">
              <p>Electricity Used</p>
              <strong>Emissions</strong>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {electricityData.length !== 0 ? (
            electricityDataDatesDesc()!.map((entry) => {
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
                      {entry.electricity_value} {entry.electricity_unit}
                    </>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>{entry.carbon_g / 1000.0}kg</>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 flex flex-col dark:text-white text-end sm:hidden">
                    <>
                      {entry.electricity_value} {entry.electricity_unit}
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
      {electricityData.length === 0 ? (
        <div className="flex flex-col items-center pt-10 gap-4">
          <strong>{'You haven\'t recorded any electricity data.'}</strong>
          <p>You can make your emissions calculation here:</p>
          <Button size="sm">
            <Link href="/electricity">Make a new calculation</Link>
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ElectricityTable;
