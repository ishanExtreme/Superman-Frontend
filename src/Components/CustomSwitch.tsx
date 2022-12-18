import React from "react";

export default function CustomSwitch(
    props:{
        title: string,
        enable: boolean,
        handleSwitchCB: (checked:boolean)=>void
    }
) {

    return(

    <div className="flex justify-center">
        <div className="form-check form-switch">
            {props.enable?
            <input 
            onClick={(e:any)=>props.handleSwitchCB(e.target.checked)}
            className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={true}/>
            :
            <input
            onClick={(e:any)=>props.handleSwitchCB(e.target.checked)}
            className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            }
            <label className="form-check-label inline-block text-gray-600" htmlFor="flexSwitchCheckDefault">{props.title}</label>
        </div>
    </div>

    )
}