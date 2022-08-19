import Link from 'next/link';
import Head from 'next/head';
import { Tabs } from 'flowbite-react';
import FlightQuestionaire from '../components/Flight/FlightQuestionaire';

export default function TravelPage() {
  return (
    <div>
      <Head>
        <title>Travel Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href="/">Home</Link>
      </nav>

      <div className="flex justify-center">
        <Tabs.Group aria-label="Pills" style="pills">
          <Tabs.Item active={true} title="Flight">
            <FlightQuestionaire />
          </Tabs.Item>
          <Tabs.Item title="Driving">Your Driving parent component here</Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
