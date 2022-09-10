import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface BlobProps {
  image: StaticImageData;
  headline: string;
  text: string;
}

export default function MainBlob({ image, headline, text }: BlobProps) {
  return (
    <div className="mainblob flex justify-center items-center">
      <div className="md:basis-full md:w-3/6 sm:w-5/6 xl:w-2/6">
        <span className="text-5xl font-bold md:text-3xl xl:text-6xl">
          {headline}
        </span>
        <p className="text-2xl xl:text-3xl md:text-xl 2xl:text-4xl py-8">
          {text}
        </p>
      </div>

      <div className="hidden md:inline shrink w-3/6 xl:w-2/6 px-20">
        <Image
          src={image}
          alt={headline}
          layout="responsive"
          className="main-blob-image"
        />
      </div>
    </div>
  );
}
