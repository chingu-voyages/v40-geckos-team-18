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
import { FlightLeg, DistanceUnit } from '../schema/flight.schema';
import { trpc } from '../utils/trpc';

const flightPage = () => {
  // const [responseData, setResponseData] = useState()
  // const { mutate, error } = trpc.useMutation(
  //   ['flight.unregistered-request-flight'],
  //   {
  //     onSuccess: (data) => {
  //       console.log(data)
  //     },
  //     onError: (e) => {
  //       // console.log(e);
  //     },
  //   }
  // );


  return (<div><FlightForm/></div>)
};

export default flightPage;
