import Image from 'next/image';
import React from 'react';
import bikeWoman1 from '../../assets/images/bike-woman1.png';

const Hero = () => (
  <div className="flex flex-col md:flex-row justify-center items-center">
    <div>
      <Image
        src={bikeWoman1}
        className="h-1 w-1"
        width={200}
        height={200}
        alt="Reduce your carbon footprint for a cleaner environment"
      />
    </div>
    <div className="flex flex-col justify-center">
      <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
        <p>Estimate your carbon footprint</p>
      </blockquote>
      <div className="flex justify-center">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Start here
        </button>
        <button
          type="button"
          className="object-none object-left-bottom focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </button>
      </div>
    </div>
  </div>
);

export default Hero;
