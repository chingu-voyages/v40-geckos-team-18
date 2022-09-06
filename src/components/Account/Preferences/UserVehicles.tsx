import { Spinner } from 'flowbite-react';
import React from 'react';
import { Vehicles } from '../../../schema/preferences.schema';
import { trpc } from '../../../utils/trpc';
import VehicleTile from './VehicleTile';

interface UserVehiclesProps {
  vehicles: Vehicles;
  primaryVehicleId: string | null;
}
const UserVehicles = ({}) => {
  const utils = trpc.useContext();

  const { data: userVehicleData, isLoading: isUserVehiclesLoading } =
    trpc.useQuery(['preferences.get-user-vehicles']);

  const { mutate: mutateUserPrimaryVehicle } = trpc.useMutation(
    'preferences.update-user-primary-vehicle',
    {
      onSuccess(data) {
        utils.setQueryData(['preferences.get-user-vehicles'], (oldData) => {
          return {
            vehicles: oldData?.vehicles,
            userPrimaryVehicle: data.userPrimaryVehicleId,
          };
        });
      },
    }
  );

  const handleUpdateUserPrimaryVehicle = (vehicleId: string) => {
    mutateUserPrimaryVehicle({ primaryVehicleId: vehicleId });
  };

  if (!userVehicleData)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="grow grid grid-cols-6 gap-10 px-10">
      {userVehicleData.vehicles!.map((vehicle) => {
        return (
          <VehicleTile
            key={vehicle.id}
            id={vehicle.id}
            make={vehicle.vehicle_make}
            model={vehicle.vehicle_model}
            year={vehicle.vehicle_year}
            isPrimary={userVehicleData.userPrimaryVehicle ?? ''}
            setPrimary={handleUpdateUserPrimaryVehicle}
          />
        );
      })}
    </div>
  );
};

export default UserVehicles;
