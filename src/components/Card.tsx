import Image from 'next/image';
import React from 'react';
import car from '../assets/images/car.png';
import plane from '../assets/images/plane.png';
import house from '../assets/images/house.png';
import shipping from '../assets/images/shipping.png';
const CardInfo = [
  {
    id: 0,
    image: plane,
    description: 'How much your flights cost to the environment?',
  },
  {
    id: 1,
    image: car,
    description: 'How much your car cost to the environment?',
  },
  {
    id: 2,
    image: house,
    description: 'How much your house cost to the environment?',
  },
  {
    id: 3,
    image: shipping,
    description: 'How much your online shopping cost to the environment?',
  },
];

const Card = () => {
  return (
    <div className="p-4 space-y-8 flex flex-col justify-center items-center">
      {/* CARD */}
      {CardInfo.map((card) => (
        <div
          className="bg-secondary h-[335px] w-[280px] flex flex-col items-center justify-center space-y-4 card"
          key={card.id}
        >
          <Image src={card.image} alt="/" height={80} width={70} />
          <p className="text-center font-bold text-white">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
