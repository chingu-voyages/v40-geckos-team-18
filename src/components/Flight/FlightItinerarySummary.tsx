import React from 'react';
import { FlightLeg } from '../../schema/flight.schema';

interface FlightItinerarySummaryProps {
  data: FlightLeg[];
}
const FlightItinerarySummary = ({ data }: FlightItinerarySummaryProps) => {
  return (
    <div>
      {data.map((leg, index) => {
        return (
          <>
            <p>
              {index + 1}: {leg.departure_airport} to {leg.destination_airport}{' '}
              in {leg.cabin_class}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default FlightItinerarySummary;
