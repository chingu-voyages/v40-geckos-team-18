import React from 'react';
import Card from './Card';
import car from '../assets/images/car.png';
import plane from '../assets/images/plane.png';
import house from '../assets/images/house.png';
import shipping from '../assets/images/shipping.png';

const Cards = () => {
  const cardInfo = [
    {
      image: plane,
      description: 'How much your flights cost to the environment?',
      link: '/travel',
    },
    {
      image: car,
      description: 'How much your car cost to the environment?',
      link: '/fuel',
    },
    {
      image: house,
      description: 'How much your house cost to the environment?',
      link: '/electricity',
    },
    {
      image: shipping,
      description: 'How much your online shopping cost to the environment?',
      link: '/shipping',
    },
  ];
  return (
    <div className="w-full p-4 space-y-8 flex flex-col justify-center items-center sm:flex-row sm:space-x-8">
      {cardInfo.map((card) => (
        <Card
          image={card.image}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default Cards;
