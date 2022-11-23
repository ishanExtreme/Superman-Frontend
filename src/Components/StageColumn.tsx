import React, { useState } from "react";
import { deleteStage } from "../api/apiSuper";
import { StageApi } from "../types/api/task";
import { Task } from "../types/tasks";
import ImageElement from "./ImageElement";
import TaskCard from "./TaskCard";
import {Droppable} from 'react-beautiful-dnd'
import { TrashIcon } from "@heroicons/react/outline";

export default function StageColumn(props:{
    stage:StageApi
    tasks:Task[]
}) {

    const [loading, setLoading] = useState(false)

    const handleDelete = async ()=>{

        setLoading(true)
        try{
            await deleteStage(props.stage.id)

        }
        catch(error)
        {

        }

        setLoading(false)
        window.location.reload()
    }

    return (
        <Droppable droppableId={String(props.stage.id)}>
            {(provided)=>(

            <div 
            ref={provided.innerRef}
            {...provided.droppableProps} 
            className="p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-y-auto min-w-[400px] h-[700px]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex space-x-2 justify-center">
                        <p className="text-xl font-semibold">{props.stage.title}</p>
                        <span className="inline-block py-2 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-400 text-white rounded ml-2">{props.tasks.length}</span>
                    </div>
                    {loading?
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    
                    <TrashIcon onClick={handleDelete} className="w-8 h-8 cursor-pointer text-beta-700"/>
                   
                    }
                </div>
                <hr className="mt-5 border-gray-500"/>

                <div className="mt-5 space-y-3">
                    {props.tasks.map((task, index)=>(
                        <TaskCard key={task.id} task={task} index={index}/>
                    ))}
                    {provided.placeholder}
                </div>
            </div>
            )}
        </Droppable>
    );
}