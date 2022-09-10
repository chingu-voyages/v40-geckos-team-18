import React from 'react';
import { VehicleResponse } from '../../schema/vehicle.schema';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

interface VehicleResponseProps {
  data: VehicleResponse;
}

const VehicleResponse = ({ data }: VehicleResponseProps) => {
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <p>
          This vehicle calculation for a{' '}
          <u>
            {data.vehicle_year} {data.vehicle_make} {data.vehicle_model}
          </u>{' '}
          on a trip covering an estimated{' '}
          <u>
            {data.distance_value}{' '}
            {data.distance_unit == 'mi' ? 'miles' : 'kilometers'}
          </u>{' '}
          resulted in your carbon emissions contribution of:
        </p>
        <p className="flex justify-center mb-3">
          <strong>{data.carbon_kg} kg</strong>
        </p>
        <hr></hr>
        <p className=" text-center">
          Thanks for using the vehicle carbon emissions calculator, please sign
          up to save and track your carbon footprint!
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

export default VehicleResponse;
