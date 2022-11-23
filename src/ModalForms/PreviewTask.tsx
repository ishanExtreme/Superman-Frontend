import React from "react";
import { Task } from "../types/tasks";
import ModalParent from '../Components/ModalParent'
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/solid";

const getDate = (date:string)=>{

    const d = new Date(date)

    return d.toDateString()
}

export default function PreviewTask(props:{
    open:boolean,
    toogleOpen: (open:boolean)=>void
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
        <ModalParent open={props.open} title={props.task.title} toogleOpen={props.toogleOpen}>
            <div className="flex flex-col ml-5 gap-y-2">
                <div>
                {renderPriority(props.task.priority)}
                </div>
               
                <p className="break-words italic text-gray-600">{props.task.description}</p>
                
                <p className="italic text-gray-600">Task's priority is{` ${props.task.priority}`}</p>
                {props.task.completed?
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-200">Task completed</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                :
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-600">Task Pending</p>
                    <ClockIcon className="w-5 h-5 text-orange-400" />
                </div>
                }
                <p className="italic text-gray-600">Task's Stage is {` ${props.task.stage_name}`}</p>
                <p className="italic text-gray-600">Task Created on {` ${getDate(props.task.created_date)}`}</p>
                <p className="italic text-gray-600">Task Due on {` ${getDate(props.task.due_date)}`}</p>
            </div>
        </ModalParent>
    );
}