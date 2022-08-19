import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
  Tooltip,
} from 'flowbite-react';
import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import {
  FlightLeg,
  DistanceUnit,
  UnregisteredFlightRequest,
  CabinClass,
} from '../../schema/flight.schema';
import { darkGreenColor } from '../../utils/colors';

interface FlightFormProps {
  handleSubmit: (flightData: UnregisteredFlightRequest) => void;
}

const FlightForm = ({ handleSubmit }: FlightFormProps) => {
  const [passengers, setPassengers] = useState(1);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [legs, setLegs] = useState<FlightLeg[]>([]);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [cabinType, setCabinType] = useState<CabinClass>('economy');
  const [roundTrip, setRoundTrip] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit({ passengers, distance_unit: distanceUnit, legs });
  };

  const changeUnitPref = () => {
    if (distanceUnit === 'km') {
      setDistanceUnit('mi');
      return;
    }
    setDistanceUnit('km');
  };

  const toggleRoundTrip = () => {
    if (roundTrip) {
      setRoundTrip(false);
      return;
    }
    setRoundTrip(true);
  };

  const addLeg = () => {
    // add our leg to our leg array
    setLegs((oldLegs) => [
      ...oldLegs,
      {
        departure_airport: departure.toUpperCase(),
        destination_airport: destination.toUpperCase(),
        cabin_class: cabinType,
      },
    ]);
    // round trip is true, add the second leg automatically
    if (roundTrip) {
      setLegs((oldLegs) => [
        ...oldLegs,
        {
          departure_airport: destination.toUpperCase(),
          destination_airport: departure.toUpperCase(),
          cabin_class: cabinType,
        },
      ]);
    }
    // clear everything
    setDeparture('');
    setDestination('');
    setRoundTrip(false);
    setCabinType('economy');
  };

  const resetForm = () => {
    setDeparture(() => '');
    setDestination(() => '');
    setCabinType(() => 'economy');
    setRoundTrip(() => false);
    setLegs(() => []);
    setDistanceUnit(() => 'km');
    setPassengers(() => 1);
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      <p>Ever wanted to know how much carbon your flights emit?</p>

      <div className="flex justify-center  items-center">
        <div className="text-center w-2/3">
          <p className="mb-4">This calculator will do just that!</p>
          <p>
            Simply enter the three letter code for your departure and
            destination airports and choose between economy or premium seats on
            your flight.
          </p>
        </div>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <p className="mt-4 mb-1">Enter the legs of this trip:</p>

        {/** departure/destination input block */}
        <div className="flex flex-row gap-4 items-center">
          <Tooltip content="Three letter IATA airport code">
            <div className="mb-2 block">
              <Label
                htmlFor="departure"
                value="Departure"
                id="departureLabel"
              />
              <TextInput
                id="departure"
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                maxLength={3}
              />
            </div>
          </Tooltip>

          <HiArrowRight className="w-6 h-6" />

          <Tooltip content="Three letter IATA airport code">
            <div className="mb-2 block">
              <Label htmlFor="destination" value="Destination" />
              <TextInput
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                maxLength={3}
              />
            </div>
          </Tooltip>
        </div>

        {/** cabin, round trip, and confirm leg input block */}
        <div className="flex flex-row justify-between">
          <div id="selectCabinType" className="block w-40">
            <div>
              <Label htmlFor="cabinType" value="Cabin Section" />
            </div>
            <Select
              id="cabinType"
              onChange={(e) => setCabinType(e.target.value as CabinClass)}
              value={cabinType}
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="roundTrip"
              onChange={toggleRoundTrip}
              checked={roundTrip}
            />
            <Label htmlFor="roundTrip" value="Round Trip?" />
          </div>

          <div className="flex items-center mt-2 justify-end">
            <Button
              type="button"
              onClick={addLeg}
              disabled={departure.length !== 3 || destination.length !== 3 ? true : false}
              color="info"
            >
              Confirm leg
            </Button>
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
          <Label
            htmlFor="passengerCount"
            value="How many passengers on this trip?"
          />
          <TextInput
            id="passengerCount"
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-row gap-4 justify-between">
          <div className="justify-start">
            <div className="mb-2 block">
              <Label htmlFor="unitPref" value="Unit Preference" />
            </div>

            <div className="flex flex-col gap-4" id="unit-toggle">
              <ToggleSwitch
                id="unitPref"
                checked={distanceUnit === 'mi' ? true : false}
                label={distanceUnit === 'mi' ? 'Miles' : 'Kilometers'}
                onChange={changeUnitPref}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              onClick={resetForm}
              size='md'
              color='info'
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={legs.length === 0 ? true : false}
              color="success"
            >
              Go!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightForm;
