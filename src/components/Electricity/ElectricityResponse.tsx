import React from 'react';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';
import { ElectricityResponse } from '../../schema/electricity.schema';

interface ElectricityResponseProps {
  data: ElectricityResponse;
}
const ElectricityResponse = ({ data }: ElectricityResponseProps) => {
  return (
    <div className="mx-auto max-w-lg m-5">
      <Card>
        <p>
          This electricity calculation resulted in your carbon emissions
          contribution of:{' '}
        </p>
        <p className="flex justify-center mb-3">
          <strong>{data.carbon_kg} kg</strong>
        </p>
        <hr></hr>
        <p className=" text-center">
          Thanks for using the electricity carbon emissions calculator, please
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

export default ElectricityResponse;
