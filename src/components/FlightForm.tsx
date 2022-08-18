import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import React, { useState } from 'react';
import {
  FlightLeg,
  DistanceUnit,
  UnregisteredFlightRequest,
} from '../schema/flight.schema';

interface FlightFormProps {
  handleSubmit: (flightData: UnregisteredFlightRequest) => void;
}

const flightForm = ({ handleSubmit }: FlightFormProps) => {
  const [passengers, setPassengers] = useState(1);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [legs, setLegs] = useState<FlightLeg[]>([]);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [cabinType, setCabinType] = useState('Economy');
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
    // check for empty fields
    if (departure.length === 0) {
      // TODO: add validation feedback
      console.error('no empty field');
      return;
    }

    if (destination.length === 0) {
      // TODO: add validation feedback
      console.error('no empty field');
      return;
    }
    // check for strings longer than 3
    if (departure.length !== 3) {
      // TODO: add validation feedback
      console.error('must enter 3 letter code');
      return;
    }

    if (destination.length !== 3) {
      // TODO: add validation feedback
      console.error('must enter 3 letter code');
      return;
    }
    // add our leg to our leg array
    setLegs((oldLegs) => [
      ...oldLegs,
      {
        departure_airport: departure.toUpperCase(),
        destination_airport: destination.toUpperCase(),
        cabin_class: cabinType.toLowerCase(),
      },
    ]);
    // round trip is true, add the second leg automatically
    if (roundTrip) {
      setLegs((oldLegs) => [
        ...oldLegs,
        {
          departure_airport: destination.toUpperCase(),
          destination_airport: departure.toUpperCase(),
          cabin_class: cabinType.toLowerCase(),
        },
      ]);
    }
    // clear everything
    setDeparture('');
    setDestination('');
    setRoundTrip(false);
    setCabinType('Economy');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4">Text to describe what this calculator does</p>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div>
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

        <p className="mt-4 mb-1">Enter the legs of this trip:</p>
        <div className="flex flex-col">
          <div className="mb-2 block">
            <Label htmlFor="departure" value="Departure" id="departureLabel" />
            <TextInput
              id="departure"
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>

          <div className="mb-2 block">
            <Label htmlFor="destination" value="Destination" />
            <TextInput
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div id="selectCabinType" className="block w-40">
            <div>
              <Label htmlFor="cabinType" value="Cabin Section" />
            </div>
            <Select
              id="cabinType"
              onChange={(e) => setCabinType(e.target.value)}
              value={cabinType}
            >
              <option>Economy</option>
              <option>Premium</option>
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

          <div className="flex items-center mt-2">
            <Button size="sm" onClick={addLeg}>
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
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
          />
        </div>

        <Button type="submit" disabled={legs.length === 0 ? true : false}>
          Calculate Emissions
        </Button>
      </form>
    </div>
  );
};

export default flightForm;
