import Image, { StaticImageData } from "next/image";
import React from "react";

interface BlobProps {
    image: StaticImageData,
    headline: string,
    text: string
}



export default function MainBlob (props:BlobProps) {
 
    return (
        <div className="mainblob flex justify-center items-center">
        <div className="grow basis-2/4 md:basis-full">
            <span className="text-5xl font-bold">{props.headline}</span>
            <p className="text-2xl">{props.text}</p>
        </div>
        

        <div className="hidden md:inline shrink">
        <Image src={props.image}
            alt={props.headline} 

            width={363}
            height={500}
            className="main-blob-image"
        />
        </div>


    </div>
    )

}