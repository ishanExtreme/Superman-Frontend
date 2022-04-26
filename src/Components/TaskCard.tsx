import React, { useState } from "react";
import { Task } from "../types/tasks";
import {deleteTask, toogleTaskComplete} from '../api/apiSuper'
import EditTask from "../ModalForms/EditTask";
import PreviewTask from "../ModalForms/PreviewTask";
import DropDownIcon from "./DropDownIcon";

const options = ["Preview", "Edit", "Delete"]

export default function TaskCard(props:{task:Task}) {

    const [loading, setLoading] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)

    const renderPriority = (priority:number)=>{

        if(priority > 6)
            return (
                <span className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full")}>Low</span>
            )
        else if(priority > 3 && priority <= 6)
            return (
                <span className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full")}>Medium</span>
            )
        else
            return (
                <span className={getClasses("text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full")}>High</span>
            )
    }

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
        
        <div className="flex flex-col gap-y-3 p-4 mx-auto bg-gray-300 shadow-lg rounded-2xl w-[350px] h-[200px]">
            
            <div className="flex flex-row justify-between items-center">
                <div>
                {renderPriority(props.task.priority)}
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
            <h2 className={getClasses("font-semibold")}>{props.task.title}</h2>
            </div>
            {/* Title ends */}

            <p className={getClasses("text-sm text-gray-800")}>{props.task.description}</p>
        </div>
        </>
    );
}