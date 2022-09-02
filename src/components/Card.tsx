import Image from 'next/image';
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
      <div className="bg-secondary h-[335px] w-[280px] flex flex-col items-center justify-center space-y-4 card cursor-pointer">
        <Image src={image} alt="placeholder" height={70} width={65} />
        <p className="text-center font-bold text-white">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
