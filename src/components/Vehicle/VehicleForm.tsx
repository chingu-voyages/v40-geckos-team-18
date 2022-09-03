import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import SelectSearch, { SelectedOptionValue } from 'react-select-search';
import { fuzzySearch } from 'react-select-search';
import { trpc } from '../../utils/trpc';
import 'react-select-search/style.css';
import {
  DistanceUnit,
  VehicleRequest,
  VehicleMakeSearch,
  VehicleModelSearch,
} from '../../schema/vehicle.schema';

interface VehicleFormProps {
  handleSubmit: (vehicleData: VehicleRequest) => void;
}

const VehicleForm = ({ handleSubmit }: VehicleFormProps) => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMakeSearch[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModelSearch[]>([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState<
    SelectedOptionValue | SelectedOptionValue[] | string
  >('');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<
    SelectedOptionValue | SelectedOptionValue[] | string
  >('');
  const [distance, setDistance] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');

  const makes = trpc.useQuery(['vehicle.get-vehicle-makes']);
  const models = trpc.useQuery([
    'vehicle.get-vehicle-models',
    selectedVehicleMake as string,
  ]);

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
  const isSubmitDisabled =
    !selectedVehicleMake || !selectedVehicleModel || !distance;

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

    handleSubmit({
      distance_unit: distanceUnit,
      distance_value: distance,
      vehicle_model_id: selectedVehicleModel as string,
    });
  };

  const resetForm = () => {
    setSelectedVehicleMake('');
    setSelectedVehicleModel('');
    setDistance(0);
    setVehicleModels([]);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p>Ever wanted to know how much carbon your road trips emit?</p>

      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="mb-4">This calculator will do just that!</p>
          <p>
            Simply enter the make and model of the car you used for your trip as
            well as an estimate of the distance you traveled for your trip.
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
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
        <div className="grid grid-cols-6 items-end">
          <div className="col-span-3 mr-3">
            <Label
              htmlFor="distance"
              value="What was the average distance traveled for your trip?"
              id="distanceLabel"
            />
            <TextInput
              id="distance"
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
              color="gray-600"
            />
          </div>
          <div className="col-span-3 md:col-span-2">
            <Select
              id="distanceUnit"
              onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
              value={distanceUnit}
              color="dark"
            >
              <option value="mi">miles</option>
              <option value="km">kilometers</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button onClick={resetForm} size="md" color="info">
            Reset
          </Button>
          <Button type="submit" color="success" disabled={isSubmitDisabled}>
            Go
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
