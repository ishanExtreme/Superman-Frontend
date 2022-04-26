import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ImageElement(props:{
    src:string, 
    className:string, 
    alt:string,
    width: string,
    height: string
}){

    const imagePlaceholder = ()=>{
        return (
        <div className={`flex flex-col gap-y-3 justify-center items-center p-5 bg-white shadow-lg rounded-xl w-[${props.width}] h-[${props.height}]`}>
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading Image</p>
        </div>
        )
    }
    return(
        <LazyLoadImage 
        src={props.src}
        className={props.className}
        alt={props.alt}
        effect="blur"
        placeholder={imagePlaceholder()}
        />
    );
}