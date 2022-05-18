import React, { useState } from "react";
import { Task } from "../types/tasks";
import {deleteTask, toogleTaskComplete} from '../api/apiSuper'
import EditTask from "../ModalForms/EditTask";
import PreviewTask from "../ModalForms/PreviewTask";
import ImageElement from "./ImageElement";

import {motion} from 'framer-motion'
import {EyeIcon, PencilAltIcon, TrashIcon} from '@heroicons/react/outline'
import PriorityBadges from "./PriorityBadges";
import DropDownIcon from "./DropDownIcon";

// for small screens
const options = ["Preview", "Edit", "Delete"]

export default function TaskListingCard(props:{task:Task}) {

    const [loading, setLoading] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)

    const getClasses = (className:string)=>{

        if(props.task.completed)
            return className+" line-through"
        else   
            return className
    }

    const deleteTaskCall = async ()=>{
        setLoading("delete")

        try{

            await deleteTask(props.task.id)
        }
        catch(error)
        {
            console.log(error)
        }

        setLoading("")
        window.location.reload()

    }

    const toogleEditOpen = (open:boolean)=>{
        setEditOpen(open)
    }

    const tooglePreviewOpen = (open:boolean)=>{
        setPreviewOpen(open)
    }

    const handleToogleComplete = async ()=>{
        setLoading("edit")

        try{
            await toogleTaskComplete(props.task.id, !props.task.completed)
            window.location.reload()
        }
        catch(error)
        {
            console.log(error)
        }
        setLoading("")
    }

    const handleDropSelect = (option:string)=>{
        if(option === "Preview")
            tooglePreviewOpen(true)
        if(option === "Edit")
            toogleEditOpen(true)
        if(option === "Delete")
            deleteTaskCall()
    }

    return (
        <>
        <EditTask open={editOpen} toogleOpen={toogleEditOpen} task={props.task} />
        <PreviewTask open={previewOpen} toogleOpen={tooglePreviewOpen} task={props.task} />
        
        {/* Small screen */}
        <div>
            <div 
            className="lg:hidden flex flex-col gap-y-3 p-4 mx-auto bg-white shadow-lg rounded-2xl w-[320px] h-[180px]"
            >
                
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <PriorityBadges 
                            priority={props.task.priority} 
                            completed={props.task.completed}
                            applyStyling={false}
                        />
                    </div>
                    <DropDownIcon options={options} handleSelectCB={handleDropSelect} />
                </div>

                {/* Title */}
                <div className="flex flex-row gap-x-5 items-center ">
                {loading === "edit" || loading === "delete"?
                <div className="mr-5 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div className="form-check">
                    {props.task.completed?
                    <input onChange={handleToogleComplete} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-2xl bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" checked/>
                    :
                    <input onChange={handleToogleComplete} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-2xl bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked"/>
                    }
                    
                </div>
                }
                <h2 className={getClasses("font-semibold truncate")}>{props.task.title}</h2>
                </div>
                {/* Title ends */}

                <p className={getClasses("text-sm text-gray-800 truncate")}>{props.task.description}</p>
            </div>
        </div>

        {/* Large screen */}
        <div className="hidden lg:flex flex-row items-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
            {loading === "edit"?
            <div className="mr-5 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            :
            <div className="form-check mr-5">
                {props.task.completed?
                <input onChange={handleToogleComplete} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-2xl bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" checked/>
                :
                <input onChange={handleToogleComplete} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-2xl bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked"/>
                }
            </div>
            }
            <div className="grid grid-cols-4 w-[50rem] gap-5">
                <div className="col-span-2">
                    <h2 className={getClasses("font-semibold truncate")}>{props.task.title}</h2>
                    <p className={getClasses("text-sm text-gray-500 truncate")}>{props.task.description}</p>
                </div>
                <div className="flex items-center justify-start">
                    <PriorityBadges 
                    priority={props.task.priority} 
                    completed={props.task.completed}
                    applyStyling={false}
                    />
                </div>

                <div className="grid grid-cols-3">
                    <div>
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={()=>tooglePreviewOpen(true)} 
                        type="button" 
                        className="flex items-center w-9 h-9">
                            <EyeIcon className="w-9 h-9 text-green-500"/>
                        </motion.button>
                    </div>

                    <div>
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={()=>toogleEditOpen(true)} 
                        type="button" 
                        className="flex items-center w-9 h-9">
                            <PencilAltIcon className="w-9 h-9 text-alpha-400"/>
                        </motion.button>
                    </div>

                    <div>
                        {loading==="delete"?
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button" 
                        className="flex items-center w-9 h-9"
                        onClick={deleteTaskCall}>
                            <TrashIcon className="w-9 h-9 text-red-500"/>
                        </motion.button>
                        }
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}