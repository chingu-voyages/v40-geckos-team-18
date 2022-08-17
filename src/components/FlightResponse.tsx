import React from 'react';
import PropTypes from 'prop-types';
import { FlightResponse } from '../schema/flight.schema';
import { Card } from 'flowbite-react';

interface FlightResponseProps {
  data: FlightResponse;
}
const FlightResponse = ({ data }: FlightResponseProps) => {
  return (
    <div className='mx-auto max-w-md mt-10'>
      <Card>
        <div className="flex flex-col justify-center text-center">
          {/* This should only render when a user is logged in 
          the field passed in will change in the future to use the user's combined carbon emissions
          from the DB */}
          <p className="mb-4">
            To date, you have emmited <strong>{data.carbon_kg} kg</strong> of carbon into the
            atmosphere.
          </p>

          <p className="mb-2">This flight calculation with these legs:</p>

          {data.legs.map((leg, index) => {
            return (
              <>
                <p>
                  {index + 1}: {leg.departure_airport} to{' '}
                  {leg.destination_airport} in {leg.cabin_class}
                </p>
              </>
            );
          })}

          <p className="mt-2">
            with a party size of {data.passengers} passengers
          </p>

          <p>resulted in your carbon emissions contribution of</p>
          <p><strong>{data.carbon_kg} kg</strong></p>
        </div>
      </Card>
    </div>
  );
};

export default FlightResponse;
