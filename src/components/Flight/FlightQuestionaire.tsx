import React from 'react';
import FlightForm from './FlightForm';
import FlightResponse from './FlightResponse';
import { UnregisteredFlightRequest } from '../../schema/flight.schema';
import { trpc } from '../../utils/trpc';
import { Spinner } from 'flowbite-react';

const FlightQuestionaire = () => {
  const { mutate, data, isLoading } = trpc.useMutation([
    'flight.unregistered-request-flight',
  ]);

  const handleSubmit = (flightData: UnregisteredFlightRequest) => {
    mutate({ ...flightData });
  };

  if (isLoading) return <Spinner aria-label='Flight response loading' />

  return (
    <div>
      {!data && !isLoading && <FlightForm handleSubmit={handleSubmit} /> }

      {data && !isLoading && <FlightResponse data={data} />}
    </div>
  );
};

export default FlightQuestionaire;
