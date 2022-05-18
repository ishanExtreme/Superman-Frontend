import React from "react";

const getClasses = (className:string, completed:boolean, applyStyling:boolean)=>{

    if(completed && applyStyling)
        return className+" line-through"
    else   
        return className
}

export default function PriorityBadges(props:{priority:number, completed:boolean, applyStyling:boolean}) {

    if(props.priority > 6)
        return (
            <span 
            className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full", props.completed, props.applyStyling)}>
                Low
            </span>
        )
    else if(props.priority > 3 && props.priority <= 6)
        return (
            <span className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-500 text-white rounded-full", props.completed, props.applyStyling)}>Medium</span>
        )
    else
        return (
            <span className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-500 text-white rounded-full", props.completed, props.applyStyling)}>High</span>
        )
}