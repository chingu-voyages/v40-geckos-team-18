import { Card } from 'flowbite-react';
import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import { ImPowerCord } from 'react-icons/im';
import { MdDriveEta, MdFlight } from 'react-icons/md';

interface SummaryTileProps {
  type: string;
  emissionsValue: number;
}

const SummaryTile = ({ type, emissionsValue }: SummaryTileProps) => {
  return (
    <div className="max-w-lg cursor-pointer">
      <Card onClick={() => console.log(type)}>
        <div className="flex flex-col items-center gap-5 px-20 py-5">
          <h4 className="text-2xl font-bold">{type}</h4>
          {getIcon(type)}
          <h3 className="text-xl">Emissions</h3>
          <h3 className="font-bold">{emissionsValue}</h3>
        </div>
      </Card>
    </div>
  );
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
