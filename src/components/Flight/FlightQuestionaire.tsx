import React from 'react';
import FlightForm from './FlightForm';
import FlightResponse from './FlightResponse';
import { FlightRequest } from '../../schema/flight.schema';
import { trpc } from '../../utils/trpc';
import { Spinner } from 'flowbite-react';

const FlightQuestionaire = () => {
  const { mutate, data, isLoading } = trpc.useMutation([
    'flight.calculation-request',
  ]);

  const handleSubmit = (flightData: FlightRequest) => {
    mutate({ ...flightData });
  };

  if (isLoading) return <Spinner aria-label="Flight response loading" />;

  return (
    <div className="w-[600px] mx-[5px]">
      {!data && !isLoading && <FlightForm handleSubmit={handleSubmit} />}

      {data && !isLoading && <FlightResponse data={data} />}
    </div>
  );
};

export default FlightQuestionaire;
