import React, { useState } from "react";
import { deleteStage } from "../api/apiSuper";
import { StageApi } from "../types/api/task";
import { Task } from "../types/tasks";
import ImageElement from "./ImageElement";
import TaskCard from "./TaskCard";

export default function StageColumn(props:{
    stage:StageApi
    task:Task
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
        <div className="p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto w-[400px] h-[700px]">
            <div className="flex flex-row justify-between items-center">
                <div className="flex space-x-2 justify-center">
                    <p className="text-xl font-semibold">{props.stage.title}</p>
                    <span className="inline-block py-2 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-400 text-white rounded ml-2">7</span>
                </div>
                {loading?
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <button type="button" className="inline-block shadow-md w-9 h-9" onClick={handleDelete}>
                    <ImageElement 
                    src={process.env.PUBLIC_URL + "/images/icons/del.png"} 
                    alt="delete"
                    className=""
                    height="50px"
                    width="50px"
                    />
                </button>
                }
            </div>
            <hr className="mt-5 border-gray-500"/>

            <div className="mt-5">
                <TaskCard task={props.task} />
            </div>
        </div>
    );
}