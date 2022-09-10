import { Button, Spinner, Table } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { FuelData } from '../../schema/dashboard.schema';

interface FuelTableProps {
  fuelData: FuelData[] | undefined;
}
const FuelTable = ({ fuelData }: FuelTableProps) => {
  const electricityDataDatesDesc = () => {
    const dataToBeSorted = [...fuelData!];
    if (fuelData)
      return dataToBeSorted.sort(
        (a, b) => b.estimated_at.valueOf() - a.estimated_at.valueOf()
      );
  };

  const getFormattedFuelData = (fuelUnitType: string, fuelValue: number) => {
    let formattedFuelUnit = fuelUnitType
      .split('_')
      .map((word) => {
        if (word.includes('btu')) {
          return word.toUpperCase();
        }

        return word.charAt(0).toUpperCase() + word.substring(1);
      })
      .join(' ');

    if (formattedFuelUnit.includes('Gallon') && fuelValue > 1)
      formattedFuelUnit += 's';

    return `${fuelValue} ${formattedFuelUnit}`;
  };

  const getFuelType = (fuelTypeCode: string) => {
    switch (fuelTypeCode) {
      case 'ng':
        return <p>Natural gas</p>;
      case 'dfo':
        return <p>Home Heating and Diesel Fuel</p>;
      case 'pg':
        return <p>Propane Gas</p>;
      case 'ker':
        return <p>Kerosene</p>;
      default:
        return '';
    }
  };

  if (!fuelData) {
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
            Type of Fuel Burned
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Amount Burned
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            Emissions
          </Table.HeadCell>
          <Table.HeadCell className="sm:hidden">
            <div className="text-end">
              <p>Summary</p>
              <strong>Emissions</strong>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {fuelData.length !== 0 ? (
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
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    {getFuelType(entry.fuel_source_type)}
                  </Table.Cell>
                  {/** Todo: update this to use the users unit preference */}
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>
                      {getFormattedFuelData(
                        entry.fuel_source_unit,
                        parseFloat(String(entry.fuel_source_value))
                      )}
                    </>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                    <>{entry.carbon_g / 1000.0}kg</>
                  </Table.Cell>
                  {/** mobile screen */}
                  <Table.Cell className="whitespace font-medium text-gray-900 flex flex-col dark:text-white text-end sm:hidden">
                    <div className="gap-4">
                      <div className="text-wrap">
                        {getFuelType(entry.fuel_source_type)}
                      </div>
                      <div>
                        {getFormattedFuelData(
                          entry.fuel_source_unit,
                          parseFloat(String(entry.fuel_source_value))
                        )}
                      </div>
                      <strong>{entry.carbon_g / 1000.0}kg</strong>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <div></div>
          )}
        </Table.Body>
      </Table>

      {fuelData.length === 0 ? (
        <div className="flex flex-col items-center pt-10 gap-4">
          <strong>{'You haven\'t recorded any fuel data.'}</strong>
          <p>You can make your emissions calculation here:</p>
          <Button size="sm">
            <Link href="/fuel">Make a new calculation</Link>
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FuelTable;
