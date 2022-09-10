import React from 'react';
import Card from './Card';
import car from '../../../public/car.png';
import plane from '../../../public/plane.png';
import house from '../../../public/house.png';

const Cards = () => {
  const cardInfo = [
    {
      id: 0,
      image: plane,
      description: 'How much your flights cost to the environment?',
      link: '/travel',
    },
    {
      id: 1,
      image: car,
      description: 'How much your car cost to the environment?',
      link: '/fuel',
    },
    {
      id: 2,
      image: house,
      description: 'How much your house cost to the environment?',
      link: '/electricity',
    },
  ];
  return (
    <div className="w-full px-20 py-8 md:gap-8 gap-3 flex flex-col justify-center items-center md:flex-row">
      {cardInfo.map((card) => (
        <Card
          key={card.id}
          image={card.image}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default Cards;
