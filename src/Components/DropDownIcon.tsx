import React from "react";
import ImageElement from "./ImageElement";

export default function DropDownIcon(
    props:{
        options: string[],
        handleSelectCB: (option:string)=>void
    }
) {

    

    return (
       

    <div className="dropdown relative">
      <button
        className="inline-block rounded-full bg-red-700 text-white leading-normal uppercase shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
       <ImageElement
       src={process.env.PUBLIC_URL + "/images/icons/more.png"}
       className="w-5 mt-1"
       alt="more"
       height="30px"
       width="30px"
        />
      </button>
      <ul
        className="dropdown-menu min-w-max max-h-[10rem] absolute bg-yellow-400 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none overflow-auto"
        aria-labelledby="dropdownMenuButton1"
      >
        {props.options.map((option, index)=>(
            <li key={index}>
                <button
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-red-700"
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