import { Spinner, Table } from 'flowbite-react';
import React from 'react';
import { ElectricityData } from '../../schema/dashboard.schema';
import { trpc } from '../../utils/trpc';

const ElectricityTable = () => {
  const { data: electricityData } = trpc.useQuery([
    'dashboard.get-electicity-data',
  ]);

//   const sortedElectricityData = () => {
//     if (electricityData)
//     return electricityData.sort((a: ElectricityData, b) => {
//         return b.estimated_at - a.estimated_at;
//     })
//   }

  if (!electricityData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Electricity Used</Table.HeadCell>
          <Table.HeadCell>Emissions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {electricityData.length !== 0 ? (
            electricityData.map((entry) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={entry.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>
                      {entry.estimated_at.toLocaleDateString()} at{' '}
                      {entry.estimated_at.toLocaleTimeString()}
                    </p>
                  </Table.Cell>
                  {/** Todo: update this to use the users unit preference */}
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <>
                      {entry.electricity_value} {entry.electricity_unit}
                    </>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <>
                    {entry.carbon_g / 1000.0}kg</>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <div></div>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ElectricityTable;
