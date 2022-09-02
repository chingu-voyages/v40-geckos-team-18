import React from 'react';
const Card = () => {
  return (
    <div className="bg-secondary h-[335px] w-[280px] flex flex-col items-center justify-center space-y-4 card">
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
        height={70}
        width={65}
      />
      <p className="text-center font-bold text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ut
        alias explicabo exercitationem quo impedit minus error recusandae natus
        ab neque et, at quas fugit!
      </p>
    </div>
  );
};

export default Card;
