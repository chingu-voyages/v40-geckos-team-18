import React from 'react';
import { Vehicles } from '../../../schema/preferences.schema';
import VehicleTile from './VehicleTile';

interface UserVehiclesProps {
    vehicles: Vehicles
    primaryVehicleId: string | null,
    handleUpdateUserPrimaryVehicle: (vehicleId: string) => void
}
const UserVehicles = ({vehicles, primaryVehicleId, handleUpdateUserPrimaryVehicle}: UserVehiclesProps) => {
  return (
    <>
      {vehicles.map((vehicle) => {
        return (
          <VehicleTile
            key={vehicle.id}
            id={vehicle.id}
            make={vehicle.vehicle_make}
            model={vehicle.vehicle_model}
            year={vehicle.vehicle_year}
            isPrimary={
              primaryVehicleId === vehicle.id ? true : false
            }
            setPrimary={handleUpdateUserPrimaryVehicle}
          />
        );
      })}
    </>
  );
};

export default UserVehicles;
