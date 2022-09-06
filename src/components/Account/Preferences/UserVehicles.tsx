import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Vehicle } from '../../../schema/preferences.schema';
import { trpc } from '../../../utils/trpc';
import ConfirmVehicleDeleteModal from './ConfirmVehicleDeleteModal';
import VehicleTile from './VehicleTile';

const UserVehicles = () => {
  const utils = trpc.useContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToBeDeleted, setVehicleToBeDeleted] = useState<
    Vehicle | undefined
  >();

  const { data: userVehicleData } = trpc.useQuery([
    'preferences.get-user-vehicles',
  ]);

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

  const { mutate: deleteVehicle } = trpc.useMutation(
    ['preferences.remove-user-vehicle'],
    {
      onSuccess() {
        utils.refetchQueries(['preferences.get-user-vehicles'], {
          active: true,
          exact: true,
          inactive: true,
        });
      },
    }
  );

  const handleUpdateUserPrimaryVehicle = (vehicleId: string) => {
    mutateUserPrimaryVehicle({ primaryVehicleId: vehicleId });
  };

  const handleDeleteVehicle = () => {
    deleteVehicle(vehicleToBeDeleted!.id);

    if (userVehicleData!.userPrimaryVehicle === vehicleToBeDeleted!.id) {
      mutateUserPrimaryVehicle({ primaryVehicleId: '' });
    }

    handleDeleteModalClose();
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal((old) => !old);
    setVehicleToBeDeleted(undefined);
  };

  const handleDeleteModalOpen = (vehicleId: string) => {
    if (userVehicleData) {
      const vehicles = userVehicleData.vehicles;
      const vehicle = vehicles!.filter((vehicle) => vehicle.id === vehicleId);

      setVehicleToBeDeleted(() => vehicle[0] as Vehicle);
      setShowDeleteModal((old) => !old);
    }
    return;
  };

  if (!userVehicleData)
    return (
      <div className="flex justify-center items-center">
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
            toggleModal={handleDeleteModalOpen}
          />
        );
      })}
      <ConfirmVehicleDeleteModal
        show={showDeleteModal}
        closeModal={handleDeleteModalClose}
        vehicle={vehicleToBeDeleted}
        handleConfirmDelete={handleDeleteVehicle}
      />
    </div>
  );
};

export default UserVehicles;
