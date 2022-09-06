import { Button, Label, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
} from 'react-select-search';
import {
  VehicleMakeSearch,
  VehicleModelSearch,
} from '../../../schema/vehicle.schema';
import { trpc } from '../../../utils/trpc';
import 'react-select-search/style.css';

interface NewVehicleModalProps {
  show: boolean;
  toggleModal: () => void;
}
const NewVehicleModal = ({ show, toggleModal }: NewVehicleModalProps) => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMakeSearch[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModelSearch[]>([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState<
    SelectedOptionValue | SelectedOptionValue[] | string
  >('');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<
    SelectedOptionValue | SelectedOptionValue[] | string
  >('');

  const utils = trpc.useContext();

  const makes = trpc.useQuery(['vehicle.get-vehicle-makes']);
  const models = trpc.useQuery([
    'vehicle.get-vehicle-models',
    selectedVehicleMake as string,
  ]);

  const { mutate: mutateVehicle } = trpc.useMutation(
    ['preferences.add-user-vehicle'],
    {
      onSuccess() {
        utils.refetchQueries(['preferences.get-user-vehicles'], {active: true, exact: true, inactive: true})
      },
    }
  );

  useEffect(() => {
    if (!makes.isLoading && makes.data) {
      setVehicleMakes(makes.data);
    }
  }, [makes.isLoading, makes.data]);

  useEffect(() => {
    if (selectedVehicleMake) {
      if (!models.isLoading && models.data) {
        setVehicleModels(models.data);
      }
    }
  }, [selectedVehicleMake, models.isLoading, models.data]);

  const isVehicleMakesDisabled = vehicleMakes?.length == 0;
  const isVehicleModelsDisabled = vehicleModels?.length == 0;
  const isSubmitDisabled = !selectedVehicleMake || !selectedVehicleModel;

  const handleVehicleMakeChange = (
    value: SelectedOptionValue | SelectedOptionValue[] | string
  ) => {
    if (selectedVehicleModel) {
      setSelectedVehicleModel('');
    }
    setSelectedVehicleMake(value);
  };

  const handleVehicleModelChange = (
    value: SelectedOptionValue | SelectedOptionValue[] | string
  ) => {
    setSelectedVehicleModel(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const make = makes.data?.filter(
      (make) => make.value === selectedVehicleMake
    );

    const yearAndModel = models.data
      ?.filter((model) => model.value === selectedVehicleModel)![0]!
      .name.split(' ');

    console.log({
      vehicle_model_id: selectedVehicleModel as string,
      vehicle_make: make![0]!.name,
      vehicle_model: yearAndModel![1],
      vehicle_year: parseInt(yearAndModel![0] as string),
    });
    mutateVehicle({
      vehicle_model_id: selectedVehicleModel as string,
      vehicle_make: make![0]!.name,
      vehicle_model: yearAndModel![1] as string,
      vehicle_year: parseInt(yearAndModel![0] as string),
    });
    resetForm();
    toggleModal();
  };

  const handleFormCancel = () => {
    resetForm();
    toggleModal();
  };

  const resetForm = () => {
    setSelectedVehicleMake(() => '');
    setSelectedVehicleModel(() => '');
  };

  return (
    <div>
      <Button onClick={() => toggleModal()}>Add new Vehicle</Button>
      <Modal show={show} onClose={() => handleFormCancel()}>
        <Modal.Header>Add new Vehicle</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center gap-4 w-full">
            <form className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="vehicleMake"
                  value="Please enter your vehicle make"
                  id="vehicleMakeLabel"
                />
                <SelectSearch
                  options={vehicleMakes}
                  value={selectedVehicleMake as string}
                  search
                  disabled={isVehicleMakesDisabled}
                  onChange={handleVehicleMakeChange}
                  filterOptions={fuzzySearch}
                  emptyMessage={'No Makes found that match'}
                  placeholder="Vehicle Make"
                />
              </div>
              <div>
                <Label
                  htmlFor="vehicleModel"
                  value="Please enter your vehicle model"
                  id="vehicleModelLabel"
                />
                <SelectSearch
                  options={vehicleModels}
                  search
                  value={selectedVehicleModel as string}
                  onChange={handleVehicleModelChange}
                  filterOptions={fuzzySearch}
                  disabled={isVehicleModelsDisabled}
                  emptyMessage={'No Models found that match'}
                  placeholder="Vehicle Model"
                />
              </div>
            </form>
            <div className="flex items-end gap-3 mt-3">
              <Button onClick={() => handleFormCancel()}>Cancel</Button>
              <Button
                onClick={(e) => handleFormSubmit(e)}
                color="success"
                disabled={isSubmitDisabled}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewVehicleModal;
