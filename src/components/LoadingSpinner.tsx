import { Spinner } from 'flowbite-react';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-5 md:py-20">
      <Spinner size="xl" />
    </div>
  );
};

export default LoadingSpinner;
