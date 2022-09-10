import React from 'react';
import PropTypes from 'prop-types';
import { FlightResponse } from '../../schema/flight.schema';
import { Button, Card } from 'flowbite-react';
import FlightItinerarySummary from './FlightItinerarySummary';
import Link from 'next/link';

interface FlightResponseProps {
  data: FlightResponse;
}
const FlightResponse = ({ data }: FlightResponseProps) => {
  return (
    <div className="mx-auto max-w-md mt-10 min-w-[50%] w-full">
      <Card>
        <div className="flex flex-col justify-center text-center">
          {/* This should only render when a user is logged in 
          the field passed in will change in the future to use the user's combined carbon emissions
          from the DB */}
          <p className="mb-4">
            To date, you have emmited <strong>{data.carbon_kg} kg</strong> of
            carbon into the atmosphere.
          </p>

          <p className="mb-2">This flight calculation with these legs:</p>

          <FlightItinerarySummary data={data.legs} />

          <p className="mt-2">
            with a party size of {data.passengers} passenger{' '}
            {data.passengers === 1 ? '' : 's'}
          </p>

          <p>resulted in your carbon emissions contribution of</p>
          <p>
            <strong>{data.carbon_kg} kg</strong>
          </p>
          <div className='flex justify-end'>
            <Button>
              <Link href="/auth/login">Register</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FlightResponse;
