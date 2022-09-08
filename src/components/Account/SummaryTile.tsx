import { Button, Card } from 'flowbite-react';
import { Circle } from 'rc-progress';
import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import { ImPowerCord } from 'react-icons/im';
import { MdDriveEta, MdFlight } from 'react-icons/md';
import { formatWeightToUserUnitPreference } from '../../utils/unitConverter';

interface SummaryTileProps {
  type: string;
  unitPreference: string;
  emissionsValue: number;
  totalEmissions: number;
  handleOnClick: (type: string) => void;
}

const SummaryTile = ({
  type,
  unitPreference,
  emissionsValue,
  totalEmissions,
  handleOnClick,
}: SummaryTileProps) => {
  const getEmissionsPercentage = (): string => {
    if (totalEmissions === 0) {
      return '0';
    }
    const emissionsPercentage = (emissionsValue / totalEmissions) * 100;
    return emissionsPercentage.toFixed(2);
  };
  return (
    <div className="grid col-span-2 max-w-lg">
      <Card>
        <div className="flex flex-col items-center gap-5 px-5 sm:px-10 md:px-15 py-5">
          <h4 className="text-2xl font-bold">{type}</h4>
          {getIcon(type)}
          <h3 className="text-xl">Emissions</h3>
          <h3 className="font-bold">
            {formatWeightToUserUnitPreference(unitPreference, emissionsValue)}
          </h3>
          <div className="relative h-24 w-24">
            <div className="absolute inset-0">
              <p className="mt-8 text-center">{getEmissionsPercentage()}%</p>
            </div>
            <Circle
              percent={parseFloat(getEmissionsPercentage())}
              strokeWidth={5}
              strokeColor={getColor(parseFloat(getEmissionsPercentage()))}
            />
          </div>

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
