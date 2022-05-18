import React from "react";

import {DotsCircleHorizontalIcon} from '@heroicons/react/outline'

export default function DropDownIcon(
    props:{
        options: string[],
        handleSelectCB: (option:string)=>void
    }
) {

    

    return (
       

    <div className="dropdown relative">
      <button
        className="inline-block rounded-full bg-transparent text-white leading-normal uppercase w-9 h-9"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      <DotsCircleHorizontalIcon className="text-beta-700"/>
      </button>
      <ul
        className="dropdown-menu min-w-max max-h-[10rem] absolute bg-alpha-400 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none overflow-auto"
        aria-labelledby="dropdownMenuButton1"
      >
        {props.options.map((option, index)=>(
            <li key={index}>
                <button
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary-600 hover:bg-beta-700 hover:text-white"
                onClick={()=>props.handleSelectCB(option)}
                >
                    {option}
                </button>
            </li>
        ))}
       

       </ul>
    </div>


    )
}