import Head from 'next/head';
import { Tabs } from 'flowbite-react';
import { FaPlane, FaCarAlt } from 'react-icons/fa';
import FlightQuestionaire from '../components/Flight/FlightQuestionaire';
import wateringPlantsImage from '../assets/images/watering-plants-img.png';
import VehicleQuestionaire from '../components/Vehicle/VehicleQuestionaire';
import Image from 'next/image';

export default function TravelPage() {
  return (
    <div>
      <Head>
        <title>Travel Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex justify-center">
        <Image src={wateringPlantsImage} alt="person watering plant" />
      </div>

      <div className="mx-auto flex justify-center w-1/3">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="Flying" icon={FaPlane}>
            <FlightQuestionaire />
          </Tabs.Item>
          <Tabs.Item title="Driving" icon={FaCarAlt}>
            <VehicleQuestionaire />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
