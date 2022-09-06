import React, { useState } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import {
  FuelSourceUnit,
  FuelSourceType,
  UnregisteredFuelRequest,
} from '../../schema/fuel.schema';

interface FuelFormProps {
  handleSubmit: (fuelData: UnregisteredFuelRequest) => void;
}

export default function FuelForm({ handleSubmit }: FuelFormProps) {
  /* Initializing state */
  const [fuelData, setfuelData] = useState({
    fuel_source_type: '' as FuelSourceType,
    fuel_source_unit: '' as FuelSourceUnit,
    fuel_source_value: 0 as number,
  });

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    handleSubmit(fuelData);
  }

  /* Function that updates the state */
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    /* Destructuring the event.target object */
    const { name, value } = event?.target;
    setfuelData((prevFuelData) => {
      return {
        ...prevFuelData,
        [name]: name == 'fuel_source_value' ? parseFloat(value) : value,
      };
    });
  }

  /* Renders the units conditionally */
  const unitOptions =
    fuelData.fuel_source_type === 'ng'
      ? ['thousand_cubic_feet', 'btu']
      : ['gallon', 'btu'];

  function resetForm() {
    setfuelData({
      fuel_source_type: '',
      fuel_source_unit: '',
      fuel_source_value: 0,
    });
  }

  return (
    <div className='container'>
      <Label htmlFor="fuel_source_type">Which fuel do you use?</Label>
      <Select
        id="fuel_source_type"
        value={fuelData.fuel_source_type}
        onChange={(event) => handleChange(event)}
        name="fuel_source_type"
      >
        <option value="">--- Choose</option>
        <option value="ng">Natural Gas</option>
        <option value="dfo">Home Heating and Diesel Fuel</option>
        <option value="pg">Propane Gas</option>
        <option value="ker">Kerosene</option>
      </Select>

      <br />

      <Label htmlFor="unit">Which measuring unit do you use?</Label>
      <Select
        id="fuel_source_unit"
        value={fuelData.fuel_source_unit}
        onChange={(event) => handleChange(event)}
        name="fuel_source_unit"
      >
        <option value="">-- Choose</option>
        <option value={unitOptions[0]}>{unitOptions[0]}</option>
        <option value={unitOptions[1]}>{unitOptions[1]}</option>
      </Select>

      <br />

      <Label htmlFor="value">
        What is the quantity of fuel you consumed? (based on the unit
        you&apos;ve chosen above)
      </Label>
      <TextInput
        id="fuel_source_value"
        type="number"
        value={fuelData.fuel_source_value}
        onChange={(event) => handleChange(event)}
        name="fuel_source_value"
      />

      <div className='flex flex-row justify-left gap-4'>
        <Button color="info" onClick={resetForm}>
          Reset
        </Button>

        <Button
          type="submit"
          disabled={
            !fuelData.fuel_source_type ||
            !fuelData.fuel_source_unit ||
            fuelData.fuel_source_value < 1
          }
          color="success"
          onClick={submitForm}
        >
          Go!
        </Button>
      </div>
    </div>
  );
}
