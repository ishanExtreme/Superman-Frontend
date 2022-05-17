import React from "react";

export default function SmallCard(props:{
    title:string,
    content:string,
    end:string,
    loading:boolean
}) {

    return (
        
        <div className="flex flex-col justify-between p-5 bg-white shadow-lg rounded-xl min-w-[150px] min-h-[150px] lg:min-w-[300px] lg:min-h-[150px]">
            {props.loading?
            <div className="flex justify-center items-center w-full h-full">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <>
                <p className="text-gray-500 font-semibold">{props.title}</p>
                <div className="space-y-1">
                    <p className="text-gray-500 font-semibold">{props.content}</p>
                    <p className="text-gray-400">{props.end}</p>
                </div>
            </>
            }
        </div>
       
    );
}