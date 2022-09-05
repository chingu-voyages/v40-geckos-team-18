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
        <div className="grow basis-2/4">
            <span className="text-5xl font-bold">{props.headline}</span>
            <p className="text-2xl">{props.text}</p>
        </div>
        

        <Image src={props.image}
            alt={props.headline} 
            layout="fixed"
            width={363}
            height={500}
            className="shrink"
        />

    </div>
    )

}