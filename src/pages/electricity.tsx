import Link from 'next/link';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import ElectricityForm from '../components/Electricity/ElectricityForm';
import { UnregisteredElectricityRequest } from '../schema/electricity.schema';
import ElectricityResponse from '../components/Electricity/ElectricityResponse';
import { Spinner } from 'flowbite-react';
import wateringPlantsImage from '../assets/images/watering-plants-img.png';
import Image from 'next/image';

export default function ElectricityConsumption() {
  const { mutate, data, isLoading } = trpc.useMutation([
    'electricity.unregistered-request-electricity',
  ]);
  const handleSubmit = (electricityData: UnregisteredElectricityRequest) => {
    mutate({ ...electricityData });
  };

  return (
    <div>
      <Head>
        <title>Electricity Consumption</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex justify-center">
        <Image src={wateringPlantsImage} alt="person watering plant" />
      </div>

      {isLoading && (
        <div className="flex justify-center mx-auto my-5">
          <Spinner aria-label="Electricity response loading" />
        </div>
      )}

      {!data && !isLoading && <ElectricityForm handleSubmit={handleSubmit} />}
      {data && !isLoading && <ElectricityResponse data={data} />}
    </div>
  );
}
