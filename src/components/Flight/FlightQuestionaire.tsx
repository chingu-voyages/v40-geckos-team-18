import React from 'react';
import FlightForm from './FlightForm';
import FlightResponse from './FlightResponse';
import { UnregisteredFlightRequest } from '../../schema/flight.schema';
import { trpc } from '../../utils/trpc';

const FlightQuestionaire = () => {
  const { mutate, data } = trpc.useMutation([
    'flight.unregistered-request-flight',
  ]);

  const handleSubmit = (flightData: UnregisteredFlightRequest) => {
    mutate({ ...flightData });
  };

  return (
    <div>
      {!data && <FlightForm handleSubmit={handleSubmit} /> }

      {data && <FlightResponse data={data} />}
    </div>
  );
};

export default FlightQuestionaire;
