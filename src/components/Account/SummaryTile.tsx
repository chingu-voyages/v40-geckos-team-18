import { Button, Card, Progress } from 'flowbite-react';
import { Circle } from 'rc-progress';
import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import { ImPowerCord } from 'react-icons/im';
import { MdDriveEta, MdFlight } from 'react-icons/md';

interface SummaryTileProps {
  type: string;
  emissionsValue: number;
  totalEmissions: number;
  handleOnClick: (type: string) => void;
}

const SummaryTile = ({
  type,
  emissionsValue,
  totalEmissions,
  handleOnClick,
}: SummaryTileProps) => {
  const emissionsPercentage = (emissionsValue / totalEmissions) * 100;
  return (
    <div className="grid col-span-2 max-w-lg">
      <Card>
        <div className="flex flex-col items-center gap-5 px-20 py-5">
          <h4 className="text-2xl font-bold">{type}</h4>
          {getIcon(type)}
          <h3 className="text-xl">Emissions</h3>
          <h3 className="font-bold">{emissionsValue} g</h3>
          <p className="text-center">
            {emissionsPercentage.toFixed(2)}% of all calculations
          </p>

          <Circle
            percent={emissionsPercentage}
            strokeWidth={5}
            strokeColor={getColor(emissionsPercentage)}
          />
          <Button onClick={() => handleOnClick(type)}>View All</Button>
        </div>
      </Card>
    </div>
  );
};

const getColor = (emissionsPercentage: number) => {
  if (emissionsPercentage > 80) return 'red';
  if (emissionsPercentage > 40) return 'yellow';
  return 'green';
};

const getIcon = (type: string) => {
  const buttonSize = 45;

  switch (type) {
    case 'Electricity':
      return <ImPowerCord size={buttonSize} />;
    case 'Fuel':
      return <FaGasPump size={buttonSize} />;
    case 'Flight':
      return <MdFlight size={buttonSize} />;
    case 'Driving':
      return <MdDriveEta size={buttonSize} />;
    default:
      return;
  }
};

export default SummaryTile;
