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
          <p key={leg.departure_airport + index}>
            {index + 1}: {leg.departure_airport} to {leg.destination_airport} in{' '}
            {leg.cabin_class}
          </p>
        );
      })}
    </div>
  );
};

export default FlightItinerarySummary;
