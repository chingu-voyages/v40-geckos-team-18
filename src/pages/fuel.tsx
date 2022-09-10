import Head from 'next/head';
import Image from 'next/image';
import plantingTreesImage from '../assets/images/planting-trees-1.png';
import FuelForm from '../components/Fuel/FuelForm';
import FuelResponse from '../components/Fuel/FuelResponse';
import { trpc } from '../utils/trpc';
import { Spinner } from 'flowbite-react';
import { UnregisteredFuelRequest } from '../schema/fuel.schema';

export default function FuelPage() {
  const { mutate, data, isLoading } = trpc.useMutation([
    'fuel.unregistered-request-fuel',
  ]);
  
  const handleSubmit = (fuelData: UnregisteredFuelRequest) => {
    mutate({ ...fuelData });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Head>
        <title>Fuel Consumption</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex justify-center">
        <Image src={plantingTreesImage} alt="Four people planting trees" />
      </div>

      <h2 className="text-4xl flex justify-center gap-4 font-bold">
        How much carbon your fuel intake has emitted so far?
      </h2>

      {isLoading && (
        <div className="flex justify-center mx-auto my-5">
          <Spinner aria-label="Electricity response loading" />
        </div>
      )}

      {!data && !isLoading && <FuelForm handleSubmit={handleSubmit} />}
      {data && !isLoading && <FuelResponse data={data} />}
    </div>
  );
}
