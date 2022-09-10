import { Button, Select, Card, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import StatesData from '../../AppData/states.json';
import {
  CountryCode,
  ElectricityUnit,
  ElectricityRequest,
} from '../../schema/electricity.schema';

interface ElectricityFormProps {
  handleSubmit: (electricityData: ElectricityRequest) => void;
}
const ElectricityForm = ({ handleSubmit }: ElectricityFormProps) => {
  const [country, setCountry] = useState<CountryCode>('us');
  const [state, setState] = useState('al');
  const [electricityUnit, setElectricityUnit] =
    useState<ElectricityUnit>('mwh');
  const [electricityValue, setElectricityValue] = useState<number | string>(0);

  const isSubmitDisabled = !electricityValue;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit({
      electricity_value: electricityValue as number,
      electricity_unit: electricityUnit,
      country: country,
      state: state,
    });
  };

  const resetForm = () => {
    setCountry(() => 'us');
    setState(() => 'al');
    setElectricityValue(() => 0);
    setElectricityUnit(() => 'mwh');
  };

  return (
    <div className="mx-auto max-w-lg m-5">
      <Card>
        <form
          className="flex flex-col py-6 gap-4"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <p className="text-center">
            {'Let\'s measure the carbon emissions from your electricity usage!'}
          </p>
          <div className="grid grid-cols-6 items-end">
            <div className="col-span-4 mr-3">
              <Label
                htmlFor="electricityValue"
                value="How much electricity is used in your household?"
                id="electricityValueLabel"
              />
              <TextInput
                id="electricityValue"
                type="number"
                min={1}
                max={1000000}
                value={electricityValue}
                onChange={(e) =>
                  e.target.value
                    ? setElectricityValue(parseInt(e.target.value))
                    : setElectricityValue('')
                }
                color="gray-600"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <Select
                id="electricityUnit"
                onChange={(e) =>
                  setElectricityUnit(e.target.value as ElectricityUnit)
                }
                value={electricityUnit}
                color="dark"
              >
                <option value="mwh">mwh</option>
                <option value="kwh">kwh</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 md:col-span-2">
              <Label htmlFor="countryValue" value="Country" id="countryLabel" />
              <Select
                id="country"
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                value={country}
                color="dark"
              >
                <option value="us">United States</option>
                <option value="ca">Canada</option>
              </Select>
            </div>
            <div className="col-span-3 md:col-span-2">
              <Label htmlFor="stateValue" value="State" id="stateLabel" />
              <Select
                id="state"
                onChange={(e) => setState(e.target.value)}
                value={state}
                color="dark"
              >
                {country === 'us'
                  ? StatesData.states.usStates.map((state) => {
                      return (
                        <option key={state.code + state.id} value={state.code}>
                          {state.name}
                        </option>
                      );
                    })
                  : StatesData.states.caProvinces.map((state) => {
                      return (
                        <option key={state.code + state.id} value={state.code}>
                          {state.name}
                        </option>
                      );
                    })}
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
      </Card>
    </div>
  );
};

export default ElectricityForm;
