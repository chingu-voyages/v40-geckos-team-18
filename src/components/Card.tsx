import React from 'react';

const Card = () => {
  return (
    <div className="p-4">
      {/* CARD */}

      <div className="card h-[335px] w-[280px] flex flex-col items-center justify-center bg-secondary">
        <img src="https://via.placeholder.com/100" alt="/" />
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A praesentium
          sint quasi officiis vitae
        </p>
      </div>
    </div>
  );
};

export default Card;
