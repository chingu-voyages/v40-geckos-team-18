import React from 'react';
import VehicleForm from './VehicleForm';
import { VehicleRequest } from '../../schema/vehicle.schema';
import { trpc } from '../../utils/trpc';
import { Spinner } from 'flowbite-react';
import VehicleResponse from './VehicleResponse';

const VehicleQuestionaire = () => {
  const { mutate, data, isLoading } = trpc.useMutation([
    'vehicle.calculation-request',
  ]);

  const handleSubmit = (vehicleData: VehicleRequest) => {
    mutate({ ...vehicleData });
  };

  if (isLoading) {
    return (
      <div className="mx-auto">
        <Spinner aria-label="Vehicle response loading" />
      </div>
    );
  }

  return (
    <div className="w-[600px] mx-[5px]">
      {!data && !isLoading && <VehicleForm handleSubmit={handleSubmit} />}

      {data && !isLoading && <VehicleResponse data={data} />}
    </div>
  );
};

export default VehicleQuestionaire;
