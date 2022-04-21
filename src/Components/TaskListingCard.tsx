import React, { useState } from "react";
import { Task } from "../types/tasks";
import {deleteTask} from '../api/apiSuper'
import EditTask from "../ModalForms/EditTask";

export default function TaskListingCard(props:{task:Task}) {

    const [loading, setLoading] = useState("")
    const [editOpen, setEditOpen] = useState(false)

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

    return (
        <>
        <EditTask open={editOpen} toogleOpen={toogleEditOpen} task={props.task} />

        <div className="p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
            <div className="grid grid-cols-4 w-[50rem] gap-5">
                <div className="col-span-2">
                    <h2 className={getClasses("font-semibold")}>{props.task.title}</h2>
                    <p className={getClasses("text-sm text-gray-500")}>{props.task.description}</p>
                </div>
                <div className="flex items-center justify-start">
                    {renderPriority(props.task.priority)}
                </div>

                <div className="grid grid-cols-3">
                    <div>
                        <button type="button" className="inline-block shadow-md w-9 h-9">
                            <img src={process.env.PUBLIC_URL + "/images/icons/prev.png"} alt="preview"/>
                        </button>
                    </div>

                    <div>
                        <button onClick={()=>toogleEditOpen(true)} type="button" className="inline-block shadow-md w-9 h-9">
                                <img src={process.env.PUBLIC_URL + "/images/icons/edit.png"} alt="edit"/>
                        </button>
                    </div>

                    <div>
                        {loading==="delete"?
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button type="button" className="inline-block shadow-md w-9 h-9" onClick={deleteTaskCall}>
                            <img src={process.env.PUBLIC_URL + "/images/icons/del.png"} alt="delete"/>
                        </button>
                        }
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}