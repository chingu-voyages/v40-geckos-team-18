import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  image: StaticImageData;
  description: string;
  link: string;
}

const Card = ({ image, description, link }: CardProps) => {
  return (
    <Link href={link}>
      <div className="bg-secondary h-[335px] w-[280px] flex flex-col gap-10 items-center justify-center space-y-4 card cursor-pointer p-4">
        <div className="relative h-20 w-20">
          <Image
            src={image}
            alt="placeholder"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-center text-2xl md:text-lg font-bold text-white">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Card;
