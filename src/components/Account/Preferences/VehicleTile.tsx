import { Badge, Button, Card, Dropdown } from 'flowbite-react';
import React from 'react';
import { GrCheckbox } from 'react-icons/gr';
import { HiCheck } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';

interface VehicleTileProps {
  id: string;
  make: string;
  model: string;
  year: number;
  isPrimary: boolean;
  setPrimary: (vehicleId: string) => void;
}

const VehicleTile = ({ id, make, model, year, isPrimary, setPrimary }: VehicleTileProps) => {
  return (
    <div className="col-span-1">
      <Card>
        {/* <div className='flex justify-end'>
          <Dropdown inline={true} label="" color="failure">
            <Dropdown.Item>Edit</Dropdown.Item>
          </Dropdown>
        </div> */}

        <p>{make}</p>
        <p></p>
        <p>
          {year} {model}
        </p>
        <div className="flex flex-row gap-2 justify-between">
          <Button color="failure">
            <RiDeleteBinLine />
          </Button>
          <div className="flex flex-row self-end justify-self-end">
            {isPrimary ? (
              <Badge
                onClick={() => console.log('click')}
                size="md"
                icon={HiCheck}
              >
                Primary
              </Badge>
            ) : (
              <Badge size="md" icon={GrCheckbox} onClick={() => setPrimary(id)}>
                Primary
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VehicleTile;
