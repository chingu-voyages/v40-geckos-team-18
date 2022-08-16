import React from 'react';
import FlightForm from '../components/FlightForm';
import FlightResponse from '../components/FlightResponse';
import { UnregisteredFlightRequest } from '../schema/flight.schema';
import { trpc } from '../utils/trpc';

const flightPage = () => {
  const { mutate, data } = trpc.useMutation([
    'flight.unregistered-request-flight',
  ]);

  const handleSubmit = (flightData: UnregisteredFlightRequest) => {
    mutate({ ...flightData });
  };

  return (
    <div>
      <FlightForm handleSubmit={handleSubmit} />
      
      {data && <FlightResponse data={data} />}
    </div>
  );
};

export default flightPage;
