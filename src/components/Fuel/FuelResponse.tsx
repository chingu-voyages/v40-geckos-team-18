import React from 'react';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';
import { FuelResponse } from '../../schema/fuel.schema';

interface FuelResponseProps {
  data: FuelResponse;
}
const FuelResponse = ({ data }: FuelResponseProps) => {
  return (
    <div className="mx-auto max-w-lg m-5">
      <Card>
        <p>
          This Fuel calculation resulted in your carbon emissions
          contribution of:{' '}
        </p>
        <p className="flex justify-center mb-3">
          <strong>{data.carbon_kg} kg</strong>
        </p>
        <hr></hr>
        <p className=" text-center">
          Thanks for using the Fuel carbon emissions calculator, please
          sign up to save and track your carbon footprint!
        </p>
        <div className="flex justify-center">
          <Button>
            <Link href="/auth/login">Register</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FuelResponse;