import React, { useState } from "react";
import { Task } from "../types/tasks";
import {motion} from 'framer-motion'
import {CheckCircleIcon, ClockIcon, ArrowCircleRightIcon, ClipboardIcon} from '@heroicons/react/solid'
import PreviewTask from "../ModalForms/PreviewTask";


const getDate = (date:string)=>{

    const d = new Date(date)

    return d.toDateString()
}

export default function TaskListCardSemi(props:{
    task:Task
}){

    const [openPreview, setOpenPreview] = useState(false)

    const toogleOpenPreview = (open:boolean)=>{
        setOpenPreview(open)
    }

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
        <>
        <PreviewTask open={openPreview} task={props.task} toogleOpen={toogleOpenPreview} />
        {/* Small screen view */}
        <div className="lg:hidden w-full p-4 px-10 mx-auto bg-white shadow-lg rounded-2xl">
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-row gap-x-2 item-center justify-center ml-2">
                    <p className="text-gray-500 font-semibold truncate">{props.task.title}</p>
                    <div>{renderPriority(props.task.priority)}</div>
                </div>
                <p className="italic text-gray-500 text-center truncate">Stage set to {props.task.stage_name}</p>
                {props.task.completed
                ?
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <p className="italic text-gray-500">Task completed</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                :
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <p className="italic text-gray-500">Task Pending</p>
                    <ClockIcon className="w-5 h-5 text-orange-400" />
                </div>
                }
                
                <div className="flex justify-center">
                    <div>
                        <button 
                        onClick={()=>toogleOpenPreview(true)}
                        type="button" className="flex items-center gap-x-2 px-6 pt-2.5 pb-2 bg-primary-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md">
                        <ClipboardIcon className="w-5 h-5"/>
                        View Task
                        </button>
                    </div>
                </div>

            </div>
        </div>

        {/* Large screen view */}
        <div className="hidden lg:block w-full p-4 px-10 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
            <div className="grid grid-cols-7 gap-5">
                <div className="flex items-center">
                    <p className="text-gray-500 font-semibold">{props.task.title}</p>
                </div>
                <div className="flex items-center">{renderPriority(props.task.priority)}</div>
                <div className="flex items-center">
                    <p className="italic text-gray-500">Stage set to {props.task.stage_name}</p>
                </div>
                {props.task.completed
                ?
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-500">Task completed</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                :
                <div className="flex flex-row items-center gap-x-2">
                    <p className="italic text-gray-500">Task Pending</p>
                    <ClockIcon className="w-5 h-5 text-orange-400" />
                </div>
                }
                <div className="flex items-center">
                    <p className="italic text-gray-500">Created on {` ${getDate(props.task.created_date)}`}</p>
                </div>
                <div className="flex items-center">
                    <p className="italic text-gray-500">Due on {` ${getDate(props.task.due_date)}`}</p>
                </div>
                {/* view details button */}
                <div className="col-end-9">
                    <div className="flex items-center mb-1">
                        <motion.button
                        onClick={()=>toogleOpenPreview(true)} 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button" 
                        className="inline-block rounded-full leading-normal uppercase shadow-md w-8 h-8">
                            <ArrowCircleRightIcon className="w-9 h-9 text-primary-600"/>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}