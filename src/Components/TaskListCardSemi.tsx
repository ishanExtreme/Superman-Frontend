import React from "react";
import { Task } from "../types/tasks";
import ImageElement from "./ImageElement";

const getDate = (date:string)=>{

    const d = new Date(date)

    return d.toDateString()
}

export default function TaskListCardSemi(props:{
    task:Task
}){

    const renderPriority = (priority:number)=>{

        if(priority > 6)
            return (
                <span className={"text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full"}>Low</span>
            )
        else if(priority > 3 && priority <= 6)
            return (
                <span className={"text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full"}>Medium</span>
            )
        else
            return (
                <span className={"text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full"}>High</span>
            )
    }

    return (
        <div className="w-full p-4 px-10 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
            <div className="grid grid-cols-6 gap-5">
                <p className="text-gray-500 font-semibold">{props.task.title}</p>
                <div>{renderPriority(props.task.priority)}</div>
                <p className="italic text-gray-500">Stage set to {props.task.stage_name}</p>
                {props.task.completed
                ?
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-500">Task completed</p>
                    <ImageElement 
                    className="w-5" 
                    src={process.env.PUBLIC_URL + "/images/icons/tick.png"} 
                    width="20px"
                    height="20px"
                    alt="tick"
                    />
                </div>
                :
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-500">Task Pending</p>
                    <ImageElement 
                    className="w-5" 
                    src={process.env.PUBLIC_URL + "/images/icons/pending.png"}
                    width="20px"
                    height="20px"
                    alt="pending"
                    />
                </div>
                }
                <p className="italic text-gray-500">Created on {` ${getDate(props.task.created_date)}`}</p>
                <p className="italic text-gray-500">Due on {` ${getDate(props.task.due_date)}`}</p>
            </div>
        </div>
    );
}