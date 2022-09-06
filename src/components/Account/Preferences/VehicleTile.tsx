import { Badge, Button, Card, Dropdown } from 'flowbite-react';
import React from 'react';
import { FaCarAlt } from 'react-icons/fa';
import { GrCheckbox } from 'react-icons/gr';
import { HiCheck } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';

interface VehicleTileProps {
  id: string;
  make: string;
  model: string;
  year: number;
  isPrimary: string;
  setPrimary: (vehicleId: string) => void;
  toggleModal: (vehicleId: string) => void;
}

const VehicleTile = ({
  id,
  make,
  model,
  year,
  isPrimary,
  setPrimary,
  toggleModal,
}: VehicleTileProps) => {
  return (
    <div className="col-span-1">
      <Card>
        <div className='flex flex-row justify-between'>
          <FaCarAlt size={20} className='ml-2'/>
          <p className='mr-5'>{year} </p>
        </div>

        <div className='flex justify-end text-lg'>
          <p className='mr-5'>
            {make} {model}
          </p>
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <Button color="failure" onClick={() => toggleModal(id)}>
            <RiDeleteBinLine />
          </Button>
          <div className="flex flex-row self-end justify-self-end">
            {isPrimary === id ? (
              <Button size="sm" disabled={true} color="success">
                <HiCheck className="mr-2" />
                Primary
              </Button>
            ) : (
              <Button size="sm" onClick={() => setPrimary(id)}>
                <GrCheckbox className="mr-2" />
                Primary
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VehicleTile;
