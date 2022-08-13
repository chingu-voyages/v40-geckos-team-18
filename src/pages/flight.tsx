import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import React, { useState } from 'react';
import FlightForm from '../components/FlightForm';
import {
  FlightResponse,
  UnregisteredFlightRequest,
} from '../schema/flight.schema';
import { trpc } from '../utils/trpc';

const flightPage = () => {
  const { mutate, data } = trpc.useMutation([
    'flight.unregistered-request-flight',
  ]);

  const handleSubmit = (flightData: UnregisteredFlightRequest) => {
    mutate({ ...flightData });
  };

  if (data) {
    return <>{data.carbon_g}</>;
  }
  return (
    <div>
      <FlightForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default flightPage;
