
import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Link from 'next/link';
import Cards from '../components/Cards';
import { signIn } from "next-auth/react";
import { Button } from "flowbite-react";
import Hero from "../components/Home/Hero";
import MainBlob from '../components/Home/MainBlob'
import WheelchairGuy from '../assets/images/guy-wheelchair 1.png'


type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <>
      <Head>
        <title>CarbonCalc - Calculate your carbon emissions</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero />

      <MainBlob 
        image={WheelchairGuy}
        headline={"Make an estimate based on your lifestyle."}
        text={"We'll sum what you consumed in your car, in your flights, to heat your house and give you the total estimate of how your lifestyle impacts the environment."}
        />

        <div className='px-20 py-8 lg:w-2/4 md:w-3/4 w-4/4'>
          <p className='text-4xl font-bold'>A throrough look into the carbon emissions of your life</p>
          <p className='font-bold'>We use latest IEA emission factor data and follow industry best practice standards.</p>
        </div>
      
      <Cards />

      <p className='px-20 py-8 text-4xl font-bold'>And check your stats monthly to check on your carbon footprint evolution.</p>
    </>
  );
};



export default Home;
