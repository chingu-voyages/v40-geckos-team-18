import React from 'react';
import PropTypes from 'prop-types';
import { FlightResponse } from '../schema/flight.schema';

interface FlightResponseProps {
  data: FlightResponse;
}
const FlightResponse = ({ data }: FlightResponseProps) => {
  return <div>FlightResponse</div>;
};

export default FlightResponse;
