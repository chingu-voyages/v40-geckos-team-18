import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import bikeWoman1 from '../../assets/images/bike-woman 1.png';

const Hero = () => (
  <div className="flex justify-center flex-col md:flex-row sm:flex-row p-10 gap-10 2xl:gap-20 xl:min-w-full">
    <div className="sm:w-2/6">
      <Image
        src={bikeWoman1}
        className="h-1 w-1"
        width={469}
        height={436}
        layout="responsive"
        alt="Woman riding a bike"
      />
    </div>
    <div className="flex flex-col justify-center gap-5 xl:w-2/6">
      <p className="text-5xl font-bold dark:text-white md:text-3xl xl:text-6xl 2xl:text-7xl">
        Estimate your carbon footprint
      </p>

      <div className="flex">
        <Link href="/auth/login">
          <button
            type="button"
            className="object-none object-left-bottom focus:outline-none text-grey font-bold bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 xl:text-xl "
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;
